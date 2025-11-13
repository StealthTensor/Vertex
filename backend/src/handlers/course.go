package handlers

import (
	"encoding/json"
	"goscraper/src/helpers"
	"goscraper/src/helpers/databases"
	"goscraper/src/types"
	"goscraper/src/utils"
)

func GetCourses(token string) (*types.CourseResponse, error) {
	encodedToken := utils.Encode(token)
	db, err := databases.NewDatabaseHelper()
	if err == nil {
		// Check cache first
		cachedData, exists, isFresh, err := db.GetCachedDataByKey(encodedToken, "courses")
		if err == nil && exists {
			if isFresh {
				// Return fresh cached data
				var courseResponse types.CourseResponse
				if jsonData, ok := cachedData.(map[string]interface{}); ok {
					jsonBytes, _ := json.Marshal(jsonData)
					json.Unmarshal(jsonBytes, &courseResponse)
					courseResponse.Stale = false
					return &courseResponse, nil
				}
			} else {
				// Data exists but is stale - try to fetch fresh, but have stale as fallback
				scraper := helpers.NewCoursePage(token)
				course, err := scraper.GetCourses()
				if err == nil && course != nil {
					// Scrape succeeded - update cache
					regNumber := ""
					if course.RegNumber != "" {
						regNumber = course.RegNumber
					}
					go db.UpsertDataByKey(encodedToken, regNumber, "courses", course)
					course.Stale = false
					return course, nil
				}
				// Scrape failed - return stale data
				var courseResponse types.CourseResponse
				if jsonData, ok := cachedData.(map[string]interface{}); ok {
					jsonBytes, _ := json.Marshal(jsonData)
					json.Unmarshal(jsonBytes, &courseResponse)
					courseResponse.Stale = true
					return &courseResponse, nil
				}
			}
		}
	}

	// No cache or cache check failed - fetch fresh
	scraper := helpers.NewCoursePage(token)
	course, err := scraper.GetCourses()
	if err != nil {
		// Scrape failed - check if we have any stale data
		if db != nil {
			cachedData, exists, _, _ := db.GetCachedDataByKey(encodedToken, "courses")
			if exists {
				var courseResponse types.CourseResponse
				if jsonData, ok := cachedData.(map[string]interface{}); ok {
					jsonBytes, _ := json.Marshal(jsonData)
					json.Unmarshal(jsonBytes, &courseResponse)
					courseResponse.Stale = true
					return &courseResponse, nil
				}
			}
		}
		return nil, err
	}

	// Scrape succeeded - update cache
	if db != nil && course != nil {
		regNumber := ""
		if course.RegNumber != "" {
			regNumber = course.RegNumber
		}
		go db.UpsertDataByKey(encodedToken, regNumber, "courses", course)
	}
	course.Stale = false
	return course, nil
}
