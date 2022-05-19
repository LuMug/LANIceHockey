### Release notes

# Attivazione servizi LANIceHockey

### Classificazione
Pubblico

### Change di riferimento
|ID      | Descrizione                               |
|---------------|--------------------------------------|
| 1 | Attivazione servizi |

### Autori
|ID      | Descrizione                               |
|---------------|--------------------------------------|
| 1 | Xavier Horisberger |
| 2 | Nathan Ferrari |
| 3 | Andrea Masciocchi |

### Revisione
| Versione | Descrizione | Autore (ID) |
|---------------|----------------- |---------------------|
| 1 | Prima stesura | 1 |

## Contenuto del rilascio
Come attivare i servizi (script) necessari per usare il LANIceHockey.

## 1. Prerequisiti
Installare NodeJs. Aprire due terminali diversi nella cartella src del progetto. (La password della macchina ubuntu è "root").

## 2. Deploy
Nel primo terminale eseguire il seguente comando:
sudo node server.js

Nel secondo terminale eseguire il seguente comando:
sudo node socket.js

## 3. Test
Aprire un browser e cercare "10.90.1.117", dovrebbe uscire la pagina di index.