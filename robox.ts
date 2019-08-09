
enum ApproximitySensor {
	A1,
	A2,
	A3,
	A4,
	A5,
	A6,
	A7,
	A8,
	A9,
	A10
}

//% color=#f44242 icon="\uf185"
namespace robox {

    /**
     * Reads approximity in cm.
     * @param sensor id
    */
	//% weight=100 blockId="robox_ultrasound" block="Approximity of %sensor"
	// duration.shadow=timePicker
	// expandableArgumentMode="toggle"
    export function ultrasound(sensor?: ApproximitySensor): number {
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
