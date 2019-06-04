//% color=#f44242 icon="\uf185"
namespace robox {

    // Functions for reading light from the gatorlight in lux or straight adv value

    /**
    * Reads the number
    */
    //% weight=30 blockId="robox_irsensor" block="Get ir-return"
    export function irsensor(): number{
	pins.i2cWriteNumber(
		10,
		command,
		NumberFormat.UInt8LE,
		true
	)
	let value = pins.i2cReadNumber(10, NumberFormat.UInt8LE, false) 
	basic.pause(10)
	return value
    }

}
