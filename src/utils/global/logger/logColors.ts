var colors = require("colors");

class CLog {
	static blueLog(params: any) {
		console.log(colors.blue(params));
	}
	static redLog(params: any) {
		console.log(colors.red(params));
	}
	static grayLog(params: any) {
		console.log(colors.gray(params));
	}
	static cyanLog(params: any) {
		console.log(colors.cyan(params));
	}
	static whiteLog(params: any) {
		console.log(colors.white(params));
	}
	static magentaLog(params: any) {
		console.log(colors.magenta(params));
	}
	static errLog(params: any) {
		console.log(colors.bgRed("ERROR : "), colors.red(params));
	}
	static warnLog(params: any) {
		console.log(colors.bgYellow("WARNING : "), colors.yellow(params));
	}
	static infoLog(params: any) {
		console.log(colors.bgBlue("INFO : "), colors.blue(params));
	}
	static successLog(params: any) {
		console.log(colors.bgGreen("SUCCESS : "), colors.green(params));
	}
}
export default CLog;
