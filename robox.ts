/**
  * Enumeration of Approximity Sensors.
  */
enum ApproximitySensor {
	//% block="A1"
	A1 = 21,
	//% block="A2"
	A2 = 22,
	//% block="A3"
	A3 = 23,
	//% block="A4"
	A4 = 24,
	//% block="A5"
	A5 = 25,
	//% block="A6"
	A6 = 26,
	//% block="A7"
	A7 = 27,
	//% block="A8"
	A8 = 28,
	//% block="A9"
	A9 = 29,
	//% block="A10"
	A10 = 30,

}

/**
 * Enumeration of Line Follower Sensors.
 */
enum LineFollowerSensor {
	//% block="L1"
	L1 = 11
	//% block="L2"
	L2 = 12
		/*	//% block="L3"
	L3 = 13
	//% block="L4"
	L4 = 14
	//% block="L5"
	L5 = 15
	//% block="L6"
	L6 = 16
	//% block="L7"
	L7 = 17
	//% block="L8"
	L8 = 18
	//% block="L9"
	L9 = 19
	//% block="L10"
	L10 = 20*/
}


/**
 * Enumeration of Type Line Follower Sensor.
 */
enum TypeLineFollowerSensor {
	//% block="left"
	LEFT = 114
	//% block="right"
	RIGHT = 76
}

/**
 * Main blocks
 */
//% weight=100 color=#f44242 icon="\uf185"
namespace robox {
	//% shim=ENUM_GET
	//% blockId=flag_enum_shim
	//% block="Flag $arg"
	//% enumName="Flags"
	//% enumMemberName="flag"
	//% enumPromptHint="e.g. B, C, ..."
	//% enumInitialMembers="A"
	//% enumIsBitMask=false
	export function _flagEnumShim(arg: number) {
		// This function should do nothing, but must take in a single
		// argument of type number and return a number value.
		return arg;
	}

}
