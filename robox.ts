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
	L1 = 12
	//% block="L3"
	L1 = 13
	//% block="L4"
	L1 = 14
	//% block="L5"
	L1 = 15
	//% block="L6"
	L1 = 16
	//% block="L7"
	L1 = 17
	//% block="L8"
	L1 = 18
	//% block="L9"
	L1 = 19
	//% block="L10"
	L1 = 20
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

	/**
	 * Reads approximity in cm.
	 * @param sensor sensor id
	 */
	//% blockId="robox_ultrasound" block="Approximity of %sensor in cm"
	//% weight=100 
	export function ultrasound(sensor: ApproximitySensor): number {
		pins.i2cWriteNumber(
			sensor,
			69,
			NumberFormat.UInt8LE,
			true
		)
		let value = pins.i2cReadNumber(sensor, NumberFormat.UInt8LE, false)
		basic.pause(10)
		return value
	}


	/**
	 * Reads intensity of line follower sensor
	 * @param sensor sensor id
	 * @param type type of sensor
	 */
	//% weight=30 blockId="robox_linefollower" block="Read line follower intensity of sensor %sensor %type"
	export function linefollower(sensor: LineFollowerSensor, type: TypeLineFollowerSensor): number{
		pins.i2cWriteNumber(
			sensor,
			type,
			NumberFormat.UInt8LE,
			true
		)
		let value = pins.i2cReadNumber(sensor, NumberFormat.UInt8LE, false) 
		basic.pause(10)
		return value
	}

}
