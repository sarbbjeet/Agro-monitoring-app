## Agriculture Monitoring System App
An app helps to display agricultural data such as temperature, moisture, and pH level in the form of dashboards. To begin, hardware units must be configured in order for sensor results to be shown on app dashboards. This project is a consolidated version of these components, the following four repositories must be set up in order to test this application.
1. LoRa Node Module  https://github.com/sarbbjeet/LoRa-Node-Module 
2. LoRa Gateway Module https://github.com/sarbbjeet/LoRa-Gateway-Module
3. Cloud Server https://github.com/sarbbjeet/Agro-server
4. Mobile App https://github.com/sarbbjeet/Agro-monitoring-app


Even the authentication system aids in the management of different  dashboards. Every user has various dashboards based on the number of fields, 
a rounded progress bar to display temperature and moisture data, and a button to operate sprinkler on/off status.

<div>
   <img src="https://user-images.githubusercontent.com/9445093/211199764-8c4634c1-d960-4fde-b735-0695e0484c59.png" width="400" height="600"> 
    <img src="https://user-images.githubusercontent.com/9445093/211197453-c72bb233-9f2f-45eb-8c96-e2ace9a5d355.jpg" width="400" height="600">  
   </div>


## Ready to use
This app is available on the Google Play store; please follow the link below to get it.

https://play.google.com/store/apps/details?id=com.app.agromonitoring



## Features of the App 
1. Authentication system
2. Gateway network configuration (SSID, Password, Farmer_id) 
3. Edit dashboards
4. Add and Remove Dashboards

5. Firebase notification system
6. GPS, SSID scanner
7. App foreground mode


 ## About App Repository 
Although this app is built with React Native CLI, only React Native components were utilised in its development.
Follow the instructions here to set up a react native repository on any machine.
1. Download or pull this repository to your machine. 
2. ``` yarn install ```   command helps to install dependencies used in this project. 
3. It's now time to add an.env file to the main project directory. A sample of the default.env file is shown below. 
```
REACT_APP_HOST=https://mycodehub.co.uk
# NEXT_PUBLIC_MQTT_URL =ws://test.mosquitto.org:8081
REACT_APP_MQTTHOST=broker.emqx.io
REACT_APP_MQTTPORT=1883
REACT_APP_MQTTCLIENTID=mqttid123
REACT_APP_MQTTUSER=user
REACT_APP_MQTTPASS=password
```
Change the mqtt settings to reflect the availability of your MQTT broker. REACT_APP_HOST is a cloud server domain address that is used to store and access dashboard settings.

4. Connect a physical device or an emulator to your computer to launch the app.
```npx react-native run-android ``` This command is used to start the react native android build process. 

5. Create build version to publish app to play store
``` ./gradlew bundleRelease ```

6. Command to test relase build ``` npx react-native run-android --variant=release ```
 
 ### Images of the app screens
 
<div>
 <img src="https://user-images.githubusercontent.com/9445093/211200585-b6844460-bcbc-4929-b186-1fb10c6941ee.png" width="300" height="500"> 
    <img src="https://user-images.githubusercontent.com/9445093/211200480-36b54004-ae86-4353-8959-3001b540c64e.jpg" width="300" height="500">  
     <img src="https://user-images.githubusercontent.com/9445093/211200505-877f4df5-248f-4235-87fd-806cd46e3799.jpg" width="300" height="500"> 
         <img src="https://user-images.githubusercontent.com/9445093/211200674-cadb453c-f80e-46f4-bdc5-584ce814e992.jpg" width="300" height="500">
          <img src="https://user-images.githubusercontent.com/9445093/211200603-6e488079-6f45-43c9-bae5-fd17c752c632.jpg" width="300" height="500"> 
         <img src="https://user-images.githubusercontent.com/9445093/211200617-9a96637d-8498-4afd-9fce-71f1f72c9910.jpg" width="300" height="500"> 
</div>




