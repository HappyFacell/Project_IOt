#include <HTTPClient.h>
#include <NewPing.h>
#include <DHT.h>
#include "WiFi.h"
#include <Wire.h>
#include <BH1750.h>

//pruebamoviles-e07f4
#define DHTPIN 32
#define DHTTYPE DHT11
#define Voltage_PIN 32
BH1750 lightMeter;
DHT dht(DHTPIN, DHTTYPE);


const char* ssid = "INFINITUMADN";
const char* password =  "4ndr35n07ch";


String serverName = "https://iot-0.herokuapp.com/Batteries/6375a27be89a77ac3dd4223c";
float res = 0;

void setup() {
  Serial.begin(9600);
  dht.begin();
  WiFi.begin(ssid, password);

  Serial.println("Connected to the WiFi network");
  Serial.print("IP Address is: ");
  Serial.println(WiFi.localIP());
  
  Wire.begin();
  lightMeter.begin();
  Serial.println(F("BH1750 Test begin"));
}

void loop() {
  delay(2000);
  HTTPClient http;

  // Quantity measures
  int temp  = dht.readTemperature(); 
  int env_hum = dht.readHumidity(); 
  // Soil moist has to be converted to percentage
  //int reads = analogRead(Voltage_PIN);
  int reads = random(2877,4095);
  float percentage = 100-map(reads,2877,4095,0,100);
  res= (float)reads/1000;
  float voltage = (20*(((float)3300/4095)*res))/1.05;
  float current = random(0, 255);

  
  /*
  // Join measures
  String measure_url = serverName + "?Percentage=" + percentage + "&Temperature=" + temp + "&Voltage" + voltage + "&Name=Carrito" + "&Current"=current;
  
  http.begin(measure_url.c_str());
  int httpResponseCode = http.GET();

  if (httpResponseCode>0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String payload = http.getString();
    Serial.println(payload);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();
  //delay(2000);
  ¨*/
}
