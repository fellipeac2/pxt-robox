//% color=#f44242 icon="\uf185"
namespace robox {

    /**
    * Reads utrasom
    */
    //% weight=30 blockId="robox_ultrasom" block="Get ultrassom %command"
    export function ultrasom(): number {
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
