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
enum MotorEnum {
    //% block="left"
    LEFT = 5000,
    //% block="right"
    RIGHT = 5001
}

//% weight=100 color=#f44242 icon="\uf1ba"
namespace robox {

	/**
	 * Basic interface of Robox's Components like motor, ultrasound, infrared, etc.
	 */
    interface Component {
		/**
		 * I2C address of a component
		 */
        address: number

		/**
		 * That method should implements a protocol to receive the address of a component
		 */
        checkAddress(): number

		/**
		 * That method should implements a protocol to change the i2c address of a component
		 * @param address new i2c address
		 */
        changeAddress(address: number): void

		/**
		 * That method should implements a protocol to send a parameter with a value to a component
		 * @param param param command / number of param (e.g.: 105)
		 * @param value value of param command
		 */
        sendParam(param: number, value: number): void

		/**
		 * That method should implements a protocol to receive the value of a param requested by a component
		 * @param param param command / number of param (e.g. 105)
		 */
        getParam(param: number): number

		/**
		 * That method should implements a protocol to receive bytes from a component passing to it nothing
		 */
        simpleRead(): number

		/**
		 * That method should implements a protocol to send a value to a component without parameter
		 * @param value value for write in a component
		 */
        simpleWrite(value: number): void
    }

    /**
     * Basic protocol of a components implementation.
     * 
     * All component should extend this implementations.
     */
    class ComponentImpl implements Component {
        address: number

        constructor(address: number) {
            this.address = address
        }

        checkAddress(): number {
            pins.i2cWriteNumber(
                this.address,
                "a".charCodeAt(0),
                NumberFormat.UInt8LE,
                true
            )
            return pins.i2cReadNumber(this.address, NumberFormat.UInt8LE, false)
        }

        changeAddress(address: number): void {
            pins.i2cWriteNumber(
                this.address,
                "C".charCodeAt(0),
                NumberFormat.UInt8LE,
                true
            )
            pins.i2cWriteNumber(
                this.address,
                address,
                NumberFormat.UInt8LE,
                true
            )
            let result = pins.i2cReadNumber(this.address, NumberFormat.UInt8LE, false)

            basic.showNumber(result)
            //control.assert(result == 1, "Couldn't change the address of component" + old_address)

        }

        sendParam(param: number, value: number): void {
            pins.i2cWriteNumber(
                this.address,
                param,
                NumberFormat.UInt8LE,
                true
            )
            pins.i2cWriteNumber(
                this.address,
                value,
                NumberFormat.UInt8LE,
                false
            )
        }

        getParam(param: number): number {
            pins.i2cWriteNumber(
                this.address,
                param,
                NumberFormat.UInt8LE,
                true
            )
            return pins.i2cReadNumber(this.address, NumberFormat.UInt8LE, false)
        }

        simpleRead(): number {
            return pins.i2cReadNumber(this.address, NumberFormat.UInt8LE, false)
        }

        simpleWrite(value: number): void {
            pins.i2cWriteNumber(
                this.address,
                value,
                NumberFormat.UInt8LE,
                false
            )
        }
    }

    class MapComponent {
        private _indexes: number[] = []
        private _components: Component[] = []

        constructor() { }

        insert(index: number, component: Component): void {
            control.assert(this._indexes.indexOf(index) < 0, "can't define two components with same index")
            this._components.forEach(function (value: Component, i: number) {
                control.assert(value.address != component.address, "can't define two components with same id")
            })
            this._indexes.push(index)
            this._components.push(component)
        }

        get(index: number): Component {
            let index_of_index = this._indexes.indexOf(index)
            control.assert(index_of_index >= 0, "There is no component with index " + index)
            return this._components[index_of_index]
        }
    }

    let components: MapComponent = new MapComponent()
    //% subcategory=Sensors
    //% group="ultrasound"
    //% shim=ENUM_GET
    //% blockId=ultrasound_enum_shim
    //% block="Ultrasound $arg"
    //% enumName="Ultrasounds"
    //% enumMemberName="ultrasound"
    //% enumPromptHint="e.g. U1, U2"
    //% enumInitialMembers="U1"
    //% enumStartValue=3000
    export function _ultrasoundNameEnumShim(arg: number): number {
        return arg;
    }

    /**
     * Define an ultrasound sensor of robox.
     * @param id id/address of component
     * @param index index of that component
     */
    //% subcategory=Sensors
    //% group="ultrasound"
    //% blockId="define_ultrasound"
    //% block="define id $id for approximity sensor $index"
    //% index.shadow="ultrasound_enum_shim"
    export function defineUltrasound(id: number, index: number): void {
        components.insert(index, new ComponentImpl(id))
    }


    /**
	 * Reads approximity in cm.
	 * @param sensor sensor id
	 */
    //% subcategory=Sensors
    //% group="ultrasound"
    //% blockId="robox_ultrasound" block="approximity of %index in cm"
    //% weight=30 
    //% index.shadow="ultrasound_enum_shim"
    export function ultrasoundRead(index: number): number {
        return components.get(index).simpleRead()
    }
    //% subcategory=Sensors
    //% group="infrared"
    //% shim=ENUM_GET
    //% blockId=infrared_enum_shim
    //% block="Infrared $arg"
    //% enumName="Infrareds"
    //% enumMemberName="infrared"
    //% enumPromptHint="e.g. IR1, IR2"
    //% enumInitialMembers="IR1"
    //% enumStartValue=4000
    export function _infraredNameEnumShim(arg: number): number {
        return arg;
    }

    /**
     * Define an infrared sensor of robox.
     * @param id id/address of component
     * @param index index of that component
     */
    //% subcategory=Sensors
    //% group="infrared"
    //% blockId="define_infrared"
    //% block="define id $id for line follower sensor $index"
    //% index.shadow="infrared_enum_shim"
    export function defineInfrared(id: number, index: number): void {
        components.insert(index, new ComponentImpl(id))
    }

    /**
     * Reads intensity of line follower sensor
     * @param sensor sensor id
     * @param type type of sensor
     */
    //% subcategory=Sensors
    //% group="infrared"
    //% weight=30 blockId="robox_linefollower" block="intensity of line follower sensor %index %type"
    //% index.shadow="infrared_enum_shim"
    export function lineFollowerRead(index: number, type: TypeLineFollowerSensor): number {
        if (type == TypeLineFollowerSensor.LEFT)
            return components.get(index).getParam("L".charCodeAt(0))
        else
            return components.get(index).getParam('r'.charCodeAt(0))
    }

    /**
     * Define a motor of robox.
     * @param id id/address of component
     * @param index index of that component
     */
    //% subcategory="Motors"
    //% group="motors"
    //% blockId="define_motor"
    //% block="define id $id for motor $index"
    export function defineMotor(id: number, index: MotorEnum): void {
        components.insert(index, new ComponentImpl(id))
    }

    /**
     * Write a velocity in motor.
     * @param velocity velocity
     * @param index motor id
     */
    //% subcategory="Motors"
    //%group="motors"
    //% weight=20 
    //% blockId="robox_write_velocity"
    //% block="Write velocity $velocity in motor $index"
    //% velocity.min="-100" velocity.max="100"
    export function writeVelocity(velocity: number, index: MotorEnum) {
        let in1 = DigitalPin.P1
        let in2 = DigitalPin.P8
        if (index == MotorEnum.LEFT) {
            in1 = DigitalPin.P2
            in2 = DigitalPin.P13
        }
        if (velocity < 0) {
            velocity = -1 * velocity
            pins.digitalWritePin(in1, 1)
            pins.digitalWritePin(in2, 0)
        } else {
            pins.digitalWritePin(in1, 0)
            pins.digitalWritePin(in2, 1)
        }
        if (velocity > 100)
            velocity = 100
        velocity = 2 * velocity
        velocity = Math.round(velocity)
        components.get(index).sendParam("v".charCodeAt(0), velocity)
    }

    /**
     * Turn motor some degrees.
     * @param index motor id
     * @param degrees degrees
     */
    //% subcategory="Motors"
    //% group="motors"
    //% weight=20 
    //% blockId="robox_turn_degree"
    //% block="Turn motor $index $degrees degrees"
    //% $degrees.min="-180" velocity.max="180"
    export function turnDegree(index: MotorEnum, degrees: number) {
	components.get(index).sendParam("v".charCodeAt(0), 0)
        let in1 = DigitalPin.P1
        let in2 = DigitalPin.P8
        let command: string
        if (index == MotorEnum.LEFT) {
            in1 = DigitalPin.P2
            in2 = DigitalPin.P13
        }
        if (degrees < 0) {
            command = "t"
            degrees = -1 * degrees
            pins.digitalWritePin(in1, 1)
            pins.digitalWritePin(in2, 0)
        } else {
            command = "T"
            pins.digitalWritePin(in1, 0)
            pins.digitalWritePin(in2, 1)
        }
        if (degrees > 180)
            degrees = 180
        degrees = Math.round(degrees)
        components.get(index).sendParam(command.charCodeAt(0), degrees)
    }

    //% blockId="robox_is_teste" block="tsste $index"
    export function teste(index : MotorEnum) : number {
        return components.get(index).getParam("S".charCodeAt(0))
    }
    //% blockId="robox_is_turning" block="Is turning? $index"
    export function isTurning(index : MotorEnum) : boolean {
        return components.get(index).getParam("i".charCodeAt(0)) == 1
    }

    /**
     * Change id of a component.
     */
    //% subcategory="Settings"
    //% group="settings"
    //% blockId="robox_change_address_component"
    //% block="Change id of component $idFrom to $idTo"
    export function changeAddressComponent(idFrom: number, idTo: number) {
        let component: Component = new ComponentImpl(idFrom)
        component.changeAddress(idTo)
    }

    /**
     * Find a lowest id of components connected.
     * 
     * if it brings zero none components found.
     * @param startId id from start lookup
     */
    //% subcategory="Settings"
    //% group="settings"
    //% blockId="robox_find_address"
    //% block="Find id started from $startId"
    //% startId.min="10" startId.max="100"
    export function findAddress(startId: number): number {
        for (let i = startId; i <= 100; i++) {
            let component: Component = new ComponentImpl(i)
            if (component.checkAddress() == i)
                return i
        }
        return 0
    }
}


