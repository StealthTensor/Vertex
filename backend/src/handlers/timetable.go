package handlers

import (
	"encoding/json"
	"goscraper/src/helpers"
	"goscraper/src/helpers/databases"
	"goscraper/src/types"
	"goscraper/src/utils"
	"strconv"
)

func GetTimetable(token string) (*types.TimetableResult, error) {
	encodedToken := utils.Encode(token)
	db, err := databases.NewDatabaseHelper()
	if err == nil {
		// Check cache first
		cachedData, exists, isFresh, err := db.GetCachedDataByKey(encodedToken, "timetable")
		if err == nil && exists {
			if isFresh {
				// Return fresh cached data
				var timetableResult types.TimetableResult
				if jsonData, ok := cachedData.(map[string]interface{}); ok {
					jsonBytes, _ := json.Marshal(jsonData)
					json.Unmarshal(jsonBytes, &timetableResult)
					timetableResult.Stale = false
					return &timetableResult, nil
				}
			} else {
				// Data exists but is stale - try to fetch fresh, but have stale as fallback
				scraper := helpers.NewTimetable(token)
				user, err := GetUser(token)
				if err == nil {
					if user.Batch == "" {
						user.Batch = "1"
					}
					batchNum, err := strconv.Atoi(user.Batch)
					if err == nil {
						timetable, err := scraper.GetTimetable(batchNum)
						if err == nil && timetable != nil {
							// Scrape succeeded - update cache
							regNumber := ""
							if timetable.RegNumber != "" {
								regNumber = timetable.RegNumber
							}
							go db.UpsertDataByKey(encodedToken, regNumber, "timetable", timetable)
							timetable.Stale = false
							return timetable, nil
						}
					}
				}
				// Scrape failed - return stale data
				var timetableResult types.TimetableResult
				if jsonData, ok := cachedData.(map[string]interface{}); ok {
					jsonBytes, _ := json.Marshal(jsonData)
					json.Unmarshal(jsonBytes, &timetableResult)
					timetableResult.Stale = true
					return &timetableResult, nil
				}
			}
		}
	}

	// No cache or cache check failed - fetch fresh
	scraper := helpers.NewTimetable(token)
	user, err := GetUser(token)
	if err != nil {
		// Scrape failed - check if we have any stale data
		if db != nil {
			cachedData, exists, _, _ := db.GetCachedDataByKey(encodedToken, "timetable")
			if exists {
				var timetableResult types.TimetableResult
				if jsonData, ok := cachedData.(map[string]interface{}); ok {
					jsonBytes, _ := json.Marshal(jsonData)
					json.Unmarshal(jsonBytes, &timetableResult)
					timetableResult.Stale = true
					return &timetableResult, nil
				}
			}
		}
		return &types.TimetableResult{}, err
	}

	if user.Batch == "" {
		user.Batch = "1"
	}
	batchNum, err := strconv.Atoi(user.Batch)
	if err != nil {
		// Scrape failed - check if we have any stale data
		if db != nil {
			cachedData, exists, _, _ := db.GetCachedDataByKey(encodedToken, "timetable")
			if exists {
				var timetableResult types.TimetableResult
				if jsonData, ok := cachedData.(map[string]interface{}); ok {
					jsonBytes, _ := json.Marshal(jsonData)
					json.Unmarshal(jsonBytes, &timetableResult)
					timetableResult.Stale = true
					return &timetableResult, nil
				}
			}
		}
		return &types.TimetableResult{}, err
	}

	timetable, err := scraper.GetTimetable(batchNum)
	if err != nil {
		// Scrape failed - check if we have any stale data
		if db != nil {
			cachedData, exists, _, _ := db.GetCachedDataByKey(encodedToken, "timetable")
			if exists {
				var timetableResult types.TimetableResult
				if jsonData, ok := cachedData.(map[string]interface{}); ok {
					jsonBytes, _ := json.Marshal(jsonData)
					json.Unmarshal(jsonBytes, &timetableResult)
					timetableResult.Stale = true
					return &timetableResult, nil
				}
			}
		}
		return nil, err
	}

	// Scrape succeeded - update cache
	if db != nil && timetable != nil {
		regNumber := ""
		if timetable.RegNumber != "" {
			regNumber = timetable.RegNumber
		}
		go db.UpsertDataByKey(encodedToken, regNumber, "timetable", timetable)
	}
	timetable.Stale = false
	return timetable, nil
}
