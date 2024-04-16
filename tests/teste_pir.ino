// Pinos
int pin_sensor_pir = 2;
int pin_button = 8; // Pino do botão
int inicial_state = 1;

// Variáveis
unsigned long currentTime;
unsigned long occupationTime;

// Protótipo da função
unsigned long millis_to_mintues(unsigned long millis); // Millis para minutos
void avisar_api(int saidas);

void sensor_detection(int saidas)
{
  if (saidas == 1)
  {
    Serial.println("Avisando que S10 esta ocupada");
    delay(10000);
  }
  else
  {
    Serial.println("Avisando que S10 esta vazia");
    delay(10000);
  }
}

void button_detection(int entrada)
{
  if (entrada == 1)
  {

    unsigned long millis_to_mintues(unsigned long millis)
    {
      return millis / 60000;
    }
  }
}

void setup()
{
  pinMode(pin_sensor_pir, INPUT);
  pinMode(pin_btn, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  currentTime = millis();

  pinMode(7, OUTPUT);
  digitalWrite(7, HIGH);
  delay(1000);
  digitalWrite(7, LOW);
  delay(10000);
}

void loop()
{

  int pir = digitalRead(pin_sensor_pir);
  int temp = digitalRead(pin_btn);
  currentTime = millis();

  sensor_detection(pir);
}
