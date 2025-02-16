# 🌦️ Weather Application

## **Project Overview**
This is a **Weather Application** built using **JavaScript, Bootstrap, and OpenWeatherMap API**. The application allows users to **search for weather data by city name** and also **automatically fetches the user's local weather** on startup.

---


## **Features**
### **1. Automatic Location-Based Weather**
- On launch, the application **detects the user's current location**.
- Displays **local weather details** before any manual search.

### **2. Search for Weather by City**
- Users can enter a **city name** or **city_name, country_code** 
- Input is **case-insensitive** and accepts any number of spaces.
- The search works using **multiple OpenWeatherMap API endpoints**.
- If the city does not exist, an **error message is displayed** below the search box.

### **3. API Integration with OpenWeatherMap**
- The application makes use of **multiple API endpoints** to fetch **weather data** and **geolocation information**:
- `https://api.openweathermap.org/data/2.5/find?q=`
  - `http://api.openweathermap.org/geo/1.0/direct?q=`
  - `https://api.openweathermap.org/data/2.5/weather?q=`
  - `https://api.openweathermap.org/data/2.5/weather?id=`
- Supports **pagination** to handle multiple city results.

### **4. Pagination for Large Data Sets**
- Displays **3 records per page** when multiple search results are available
- Users can **navigate between pages** for large datasets.

### **5. Displaying Country Flags**
- Uses OpenWeatherMap API to display the **country flag**.
Flag URL: `http://openweathermap.org/images/flags/{country-code}.png`

---

## **Tech Stack**
- **Frontend:** HTML5, CSS3, JavaScript
- **Styling:** Bootstrap 5
- **APIs Used:** OpenWeatherMap API (Weather, Geolocation)
- **Pagination:** JavaScript Pagination Logic

----


