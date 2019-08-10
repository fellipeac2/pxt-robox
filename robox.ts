/**
 * Enumeration of Type Line Follower Sensor.
 */
enum TypeLineFollowerSensor {
	//% block="left"
	LEFT = 114,
	//% block="right"
	RIGHT = 76
}

/**
 * Enumeration of Motor.
 */
enum Motor {
	//% block="left"
	LEFT = 0,
	//% block="right"
	RIGHT = 1
}
/**
 * Robox namespace
 */
//% weight=100 color=#f44242 icon="\uf185"
namespace robox {

	export class Sensor { 
		_address : number

		constructor(address : number) {
			this._address = address
		}

		getAddress() : number {
			return this._address
		}
	}


	let ultrasounds : Sensor[] = []
	let ultrasoundIds : number[] = []
	let infrareds : Sensor[] = []
	let infraredIds : number[] = []
	
	let motorLeftAddress : number = 0
	let motorRightAddress : number = 0


	//% shim=ENUM_GET
	//% blockId=ultrasound_enum_shim
	//% block="Ultrasound $arg"
	//% enumName="Ultrasounds"
	//% enumMemberName="ultrasound"
	//% enumPromptHint="e.g. US1, US2"
	//% enumInitialMembers="US1"
	export function _ultrasoundNameEnumShim(arg: number) {
		return arg;
	}

	//% shim=ENUM_GET
	//% blockId=infrared_enum_shim
	//% block="Infrared $arg"
	//% enumName="Infrareds"
	//% enumMemberName="infrared"
	//% enumPromptHint="e.g. IR1, IR2"
	//% enumInitialMembers="IR1"
	export function _infraredNameEnumShim(arg: number) {
		return arg;
	}


	/**
	 * Create a sensor of robox.
	 * @param address address of sensor
	 */
	//% block="sensor of address %address"
	export function createSensor(address : number): Sensor {
		return new Sensor(address);
	}

	/**
	 * Define an ultrasound sensor of robox.
	 */
	//% blockId=define_ultrasound_sensor
	//% block="Define Ultrasound Sensor $name $sensor"
	//% name.shadow="ultrasound_enum_shim"
	export function defineUtrasoundSensor(name : number, sensor : Sensor) {
		ultrasounds.push(sensor)
		ultrasoundIds.push(name)
	}

	/**
	 * Define an infrared sensor of robox.
	 */
	//% blockId=define_infrared_sensor
	//% block="Define Infrared Sensor $name $sensor"
	//% name.shadow="infrared_enum_shim"
	export function defineInfraredSensor(name : number, sensor : Sensor) {
		infrareds.push(sensor)
		infraredIds.push(name)
	}

	/**
	 * Define the motors of robox.
	 * @param leftId id of motor left
	 * @param rightId id of motor right
	 */
	//% blockId=define_motor
	//% block="Define Motor Left $leftId and Right $rightId"
	export function defineMotor(leftId: number, rightId: number) {
		if(leftId != rightId) {
			motorLeftAddress = leftId
			motorRightAddress = rightId
		}
	}

	/**
	 * Reads approximity in cm.
	 * @param sensor sensor id
	 */
	//% blockId="robox_ultrasound" block="approximity of %sensor in cm"
	//% weight=30 
	//% sensor.shadow="ultrasound_enum_shim"
	export function ultrasoundRead(sensor: number): number {
		let address = ultrasounds[ultrasoundIds.indexOf(sensor)].getAddress()

		pins.i2cWriteNumber(
			address,
			68,
			NumberFormat.UInt8LE,
			true
		)
		let value = pins.i2cReadNumber(address, NumberFormat.UInt8LE, false)
		basic.pause(10)
		return value
	}

	/**
	 * Reads intensity of line follower sensor
	 * @param sensor sensor id
	 * @param type type of sensor
	 */
	//% weight=30 blockId="robox_linefollower" block="intensity of line follower sensor %sensor %type"
	//% sensor.shadow="infrared_enum_shim"
	export function lineFollowerRead(sensor: number, type: TypeLineFollowerSensor): number{
		let address = infrareds[infraredIds.indexOf(sensor)].getAddress()
		pins.i2cWriteNumber(
			address,
			type,
			NumberFormat.UInt8LE,
			true
		)
		let value = pins.i2cReadNumber(address, NumberFormat.UInt8LE, false) 
		basic.pause(10)
		return value
	}

	/**
	 * Write velocity in motor.
	 * @param motor motor for set velocity
	 */
	//% weight=30 blockId="robox_write_velocity" block="Write velocity $velocity in motor $motor"
	//% velocity.min=-100 velocity.max=100
	export function writeVelocity(velocity: number, motor: Motor) {
		let address = 0
		let in1 = DigitalPin.P1
		let in2 = DigitalPin.P8
		switch(motor) {
			case Motor.LEFT:
				address = motorLeftAddress
				in1 = DigitalPin.P2
				in2 = DigitalPin.P13
				break;
			case Motor.RIGHT:
				address = motorRightAddress
				break
		}
		if(address == 0)
			return
		if(velocity < -100)
			velocity = -100
		else if(velocity > 100)
			velocity = 100
		if(velocity < 0) {
			velocity = -1*velocity
			pins.digitalWritePin(in1, 1)
			pins.digitalWritePin(in2, 0)
		} else {
			pins.digitalWritePin(in1, 0)
			pins.digitalWritePin(in2, 1)
		}
		velocity = pins.map(velocity, 0, 100, 0, 255)
		pins.i2cWriteNumber(
			address,
			118,
			NumberFormat.UInt8LE,
			true
		)
		pins.i2cWriteNumber(
			address,
			velocity,
			NumberFormat.UInt8LE,
			false
		)
		basic.pause(5)

	}

}
