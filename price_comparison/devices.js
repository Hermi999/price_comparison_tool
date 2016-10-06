/* Vorgehen:
 *
 *	Seite scrappen mit Attributen Hersteller, Model, Kategorie, Preis, Anbieter
 *  Große Datenquelle erstellen (aktuell excel), in der alle Seiten inkludiert sind
 *	In der großen Datenquelle die Duplikate (Hersteller + Model) entfernen und sie sortieren
 *	Daten-Trippel (Hersteller - Model - Kategorie) hier einfügen. Jedes Daten-Trippel ist nur mit Beistrich vom nächsten getrennt. Keine Leerzeichen.
 */

var raw_data = [];
var device_arr = [];
var device_arr2 = [];
var device_arr3 = [];
var device_arr4 = [];

raw_data.forEach(function(el){
	device_arr = device_arr.concat(el.split(","));
  device_arr2 = device_arr2.concat(el.split(","));
  device_arr3 = device_arr3.concat(el.split(","));
  device_arr4 = device_arr4.concat(el.split(","));
});

//$.uniqueSort(device_arr);