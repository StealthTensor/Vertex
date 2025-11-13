package handlers

import (
	"encoding/json"
	"goscraper/src/helpers"
	"goscraper/src/helpers/databases"
	"goscraper/src/types"
	"goscraper/src/utils"
)

func GetMarks(token string) (*types.MarksResponse, error) {
	encodedToken := utils.Encode(token)
	db, err := databases.NewDatabaseHelper()
	if err == nil {
		// Check cache first
		cachedData, exists, isFresh, err := db.GetCachedDataByKey(encodedToken, "marks")
		if err == nil && exists {
			if isFresh {
				// Return fresh cached data
				var marksResponse types.MarksResponse
				if jsonData, ok := cachedData.(map[string]interface{}); ok {
					jsonBytes, _ := json.Marshal(jsonData)
					json.Unmarshal(jsonBytes, &marksResponse)
					marksResponse.Stale = false
					return &marksResponse, nil
				}
			} else {
				// Data exists but is stale - try to fetch fresh, but have stale as fallback
				scraper := helpers.NewAcademicsFetch(token)
				marks, err := scraper.GetMarks()
				if err == nil && marks != nil {
					// Scrape succeeded - update cache
					regNumber := ""
					if marks.RegNumber != "" {
						regNumber = marks.RegNumber
					}
					go db.UpsertDataByKey(encodedToken, regNumber, "marks", marks)
					marks.Stale = false
					return marks, nil
				}
				// Scrape failed - return stale data
				var marksResponse types.MarksResponse
				if jsonData, ok := cachedData.(map[string]interface{}); ok {
					jsonBytes, _ := json.Marshal(jsonData)
					json.Unmarshal(jsonBytes, &marksResponse)
					marksResponse.Stale = true
					return &marksResponse, nil
				}
			}
		}
	}

	// No cache or cache check failed - fetch fresh
	scraper := helpers.NewAcademicsFetch(token)
	marks, err := scraper.GetMarks()
	if err != nil {
		// Scrape failed - check if we have any stale data
		if db != nil {
			cachedData, exists, _, _ := db.GetCachedDataByKey(encodedToken, "marks")
			if exists {
				var marksResponse types.MarksResponse
				if jsonData, ok := cachedData.(map[string]interface{}); ok {
					jsonBytes, _ := json.Marshal(jsonData)
					json.Unmarshal(jsonBytes, &marksResponse)
					marksResponse.Stale = true
					return &marksResponse, nil
				}
			}
		}
		return nil, err
	}

	// Scrape succeeded - update cache
	if db != nil && marks != nil {
		regNumber := ""
		if marks.RegNumber != "" {
			regNumber = marks.RegNumber
		}
		go db.UpsertDataByKey(encodedToken, regNumber, "marks", marks)
	}
	marks.Stale = false
	return marks, nil
}
