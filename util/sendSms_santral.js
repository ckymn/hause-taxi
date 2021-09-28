require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSms = async (phone, data) => {
    try {
        let _date = data[0].datum
        let _hour = data[0].unherzit;
        let _name = data[1].name;
        let _surname = data[1].surname;
        let _personel = data[0].personen;
        let _limusin = data[0].fahrzeug;
        let _here = data[0].here;
        let _there = data[0].there;
        let _phone = data[1].phone;
        let _bavul = data[0].koffer;
        let _koltuk = data[0].kindersitz;
        let _prise = data[0].totalPrice;

        let a = await client.messages.create({
            body: `
            Neue Kundenbestellung Willkommen bei Haustaxi Sehr geehrte(r) : ${_name} ${_surname} 
            Vielen Dank für Ihre Bestellung! Datum & Uhrzeit :  ${_date} ${_hour}
            Personen: ${_personel}
            Fahrzeug : ${_limusin} 
            Abholadresse : ${_here} 
            Zieladresse : ${_there}
            Telefon : ${_phone} 
            Koffer :  ${_bavul}
            Kindersitz : ${_koltuk}
            Preis : ${_prise}

            Vielen Dank

            Mit freundlichen Grüßen
            Haustaxi Time GmbH
            +43223621000
            `,
            from: process.env.TWILIO_PHONE,
            to: process.env.SANTRAL_PHONE,
        });

        console.log(a);
    } catch (error) {
        return console.log(error);
    }
};

module.exports = sendSms;