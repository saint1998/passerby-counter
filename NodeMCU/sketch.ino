#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <string>
#include <ArduinoJson.h>
//const char* SSID = "Icewanee";
const char *SSID = "saint";
//const char* password = "iceiceice";
const char *password = "18012541";
String url = "https://embbed-3903b.firebaseapp.com/person";

void setup()
{
    // put your setup code here, to run once:
    Serial.begin(115200);
    WiFi.begin(SSID, password);           //ใส่ ssid และ password เข้า WiFi
    while (WiFi.status() != WL_CONNECTED) //ตรวจเช็ค และ รอจนเชื่อมต่อ AP สำเร็จ
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void loop()
{
    if (WL_CONNECTED)
    {
        if (Serial.available()) //Get the number of bytes (characters) available for reading from the serial port.
        {
            char inBuffer = Serial.read(); //reads characters from the serial port into a buffer.
            Serial.print("Received:");
            Serial.println(inBuffer);
            String stat = inBuffer == '1' ? "in" : "out";
            stat = "{\"status\":\"" + stat + "\"}";
            Serial.println("Sending to server...");
            HTTPClient http;                                                                //Declare object of class HTTPClient
            http.begin(url, "46 F2 E8 99 89 6D 93 C2 44 E0 44 22 D0 86 9B F2 56 A7 7C 95"); //Specify request destination
            http.addHeader("Content-Type", "application/json");
            int response = http.POST(stat);
            if (response > 0)
            {
                Serial.print("Yes ");
                Serial.println(http.getString());
            }
            else
            {
                Serial.print("No ");
                Serial.println(response);
            }
            http.end();
        }
    }
    else
    {
        Serial.println("wifi error");
        delay(1000);
    }
}