/**
  * Enumeration of approximity sensors.
  */
enum ApproximitySensor {
	//% block="A1"
	A1,
	//% block="A2"
	A2,
	//% block="A3"
	A3,
	//% block="A4"
	A4,
	//% block="A5"
	A5,
	//% block="A6"
	A6,
	//% block="A7"
	A7,
	//% block="A8"
	A8,
	//% block="A9"
	A9,
	//% block="A10"
	A10,

}
/**
 * Main blocks
 */
//% weight=100 color=#f44242 icon="\uf185"
namespace robox {

	/**
	 * Reads approximity in cm.
	 * @param sensor sensor id
	 */
	//% blockId="robox_ultrasound" block="Approximity of %sensor in robox"
	//% weight=100 
	export function ultrasound(sensor: ApproximitySensor): number {
		pins.i2cWriteNumber(
			10,
			69,
			NumberFormat.UInt8LE,
			true
		)
		let value = pins.i2cReadNumber(10, NumberFormat.UInt8LE, false)
		basic.pause(10)
		return value
	}

	// Functions for reading light from the gatorlight in lux or straight adv value

	/**
	 * Reads the number 1
	 */
	//% weight=30 blockId="robox_irsensor1" block="Get ir-return1 %command"
	export function irsensor1(): number{
		pins.i2cWriteNumber(
			10,
			114,
			NumberFormat.UInt8LE,
			true
		)
		let value = pins.i2cReadNumber(10, NumberFormat.UInt8LE, false) 
		basic.pause(10)
		return value
	}
	/**
	 * Reads the number 2
	 */
	//% weight=30 blockId="robox_irsensor2" block="Get ir-return2 %command"
	export function irsensor2(): number{
		pins.i2cWriteNumber(
			10,
			76,
			NumberFormat.UInt8LE,
			true
		)
		let value = pins.i2cReadNumber(10, NumberFormat.UInt8LE, false) 
		basic.pause(10)
		return value
	}

}
