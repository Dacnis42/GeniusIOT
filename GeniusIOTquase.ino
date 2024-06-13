#include <EEPROM.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>


const char* ssid = "Esp32";
const char* password = "12345678";


const char* mqtt_server = "test.mosquitto.org";


WiFiClient espClient;
PubSubClient client(espClient);


long lastMsg = 0;
char msg[50];
int value = 0;
char Contador = 0;


long previousMillis = 0;
long interval = 1000; //Tempo do intervalo dentro do loop. 1000 milisegundos (1 segundo)
int timeControl = 0;
int led[4] = {17, 16, 4, 2};
int but[4] = {23, 22, 19, 18}; //Pinos dos botões
int sequence[100];
int countGame = 0;
int countInput = 0;
int maxScore = EEPROM.read(0); // Retorna o valor do score armazenado na EEPROM
boolean play = true;




//----- SETUP -----/
void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);


  for (int i = 0; i < 4; i++) {
    pinMode(led[i], OUTPUT);
    pinMode(but[i], INPUT);
  }
  randomSeed(analogRead(0));
  score();
  start();
}


void setup_wifi() {
 
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);


  WiFi.begin(ssid, password);


  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }


  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());


}


void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
  //  if (client.connect("ESP8266Client")) {
    if (client.connect("Equipe_genius/PLACAR")) {
      Serial.println("connected");
      // Subscribe
      //client.subscribe("esp32/output");
      client.subscribe("Equipe_genius/PLACAR");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
// Wait 5 seconds before retrying
      delay(500);
    }
  }
}


//----- LOOP PRINCIPAL -----/
void loop() {
  unsigned long currentMillis = millis();


  if (currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;
    timeControl++;
    if (timeControl >= 10) {
      start();
    }
  }


  if (play == true) {
    game();
      if (!client.connected()) {
    reconnect();
  }
    client.loop();


     char tempString[8];
    dtostrf(maxScore, 1, 2, tempString);
    Serial.print("Rodada:");    Serial.println(countGame);
    client.publish("Equipe_genius/PLACAR", tempString);
   
  }
  else {
    player();
  }
}

//----- SORTEIO DO JOGO -----/
void game() {
  countGame++;
  sequence[countGame] = random(4);
  for (int i = 1; i <= countGame; i++) {
    digitalWrite(led[sequence[i]], HIGH);
    delay(400);
    digitalWrite(led[sequence[i]], LOW);
    delay(150);
  }
  play = false;
}

//----- JOGADOR -----


void player() {
  int input = 4;
  int t = 300;


  // Leitura dos botões
  for (int b = 0; b < 4; b++) {
    if (digitalRead(but[b]) == 1) {
      digitalWrite(led[b], HIGH);
      delay(t);
      input = b;
    }
  }


  // Apaga todos os leds
  for (int i = 0; i < 4; i++) {
    digitalWrite(led[i], LOW);
  }


  if (input != 4) {
    timeControl = 0;
    countInput++;
    if (sequence[countInput] != input) {
      delay(t);
      blinkLeds(8, 150);
      score();
      delay(3000);
      start();
      Serial.println("Errou!");
    } else if (countInput == countGame) {
      countInput = 0;
      play = true;
      delay(t);
      blinkLeds(1, 1000);
      Serial.println("Acertou!");
    }
  }
}

//----- SEQUÊNCIA INICIAL DE PISCAR DOS LEDS -----
  void start() {
    while (digitalRead(19)!= HIGH){
     Serial.println("Para iniciar, aperte o botão correspondente ao led vermelho");
     delay(15000);
  }
  countGame = 0;
  countInput = 0;
  timeControl = 0;
  play = true;
  //Pisca os leds randomicamente
  for (int i = 0; i < 15; i++) {
    int x = random(4);
    digitalWrite(led[x], HIGH);
    delay(20);
    digitalWrite(led[x], LOW);
    delay(100);
  }
  //Apaga e acende os leds em sequência
  for (int y = 0; y < 3; y++) {
    for (int i = 0; i < 4; i++) {
      digitalWrite(led[i], LOW);
      delay(80);
    }
    for (int i = 0; i < 4; i++) {
      digitalWrite(led[i], HIGH);
      delay(80);
    }
  }
  delay(1000);
  //Apaga todos os leds
  for (int i = 0; i < 4; i++) {
    digitalWrite(led[i], LOW);
  }
  delay(1000);
}




//----- PISCA OS LEDS -----
void blinkLeds(int qtd, int t) {
  //qtd = quantidade de piscadas / t = tempo
  for (int y = 0; y < qtd; y++) {
    //Acende todos os leds
    for (int i = 0; i < 4; i++) {
      digitalWrite(led[i], HIGH);
    }
    delay(t);
    //Apaga todos os leds
    for (int i = 0; i < 4; i++) {
      digitalWrite(led[i], LOW);
    }
    delay(t);
  }
}

//----- VERIFICA, EXIBE E GRAVA A PONTUAÇÃO -----
void score() {
  //Zera a EEPROM caso esteja acima de 100.
  if (maxScore > 100) {
    EEPROM.write(0, 0);
 
  }
  //Verifica a pontuação
  if (countGame - 1 > maxScore) {
    EEPROM.write(0, countGame - 1);
    maxScore = countGame - 1;
    for (int i = 0; i < 100; i++) {
      digitalWrite(led[0], HIGH);
      delay(50);
      digitalWrite(led[0], LOW);
      delay(50);
    }
  }
  else if (digitalRead(but[0]) == 1) {
    //Se o verde estiver pressionado, exibe a pontuação piscando o led verde
    for (int i = 0; i < maxScore; i++) {
      digitalWrite(led[0], HIGH);
      delay(500);
      digitalWrite(led[0], LOW);

      delay(500);
    }

    delay(1000);
    if (digitalRead(but[0]) == 1) {
      //Após exibir a pontuação, efetua o reset dos pontos caso o botão verde estiver pressionado
      EEPROM.write(0, 0);
     
    }
  }
}

