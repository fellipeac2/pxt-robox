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
 * Robox namespace
 */
//% weight=100 color=#f44242 icon="\uf185"
namespace robox {

	let ultrasounds : Sensor[]
	let infrareds : Sensor[]

	export class Sensor { 
		_address : number

		constructor(address : number) {
			this._address = address
		}
	}


	//% shim=ENUM_GET
	//% blockId=ultrasound_enum_shim
	//% block="Ultrasound $arg"
	//% enumName="Ultrasounds"
	//% enumMemberName="ultrasound"
	//% enumPromptHint="e.g. U1, U2"
	//% enumInitialMembers="U1"
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
	//% block="define Ultrasound Sensor $name $sensor"
	//% name.shadow="ultrasoud_enum_shim"
	export function defineUtrasoundSensor(name : number, sensor : Sensor) {
		ultrasounds.push(sensor)
	}

	/**
	 * Define an infrared sensor of robox.
	 */
	//% blockId=define_infrared_sensor
	//% block="define Infrared Sensor $name $sensor"
	//% name.shadow="infrared_enum_shim"
	export function defineInfraredSensor(name : number, sensor : Sensor) {
		infrareds.push(sensor)
	}

}
