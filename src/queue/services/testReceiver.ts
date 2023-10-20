export default function testReceiverCallbackFunc(data: any) {
	const ret = {
		myFirstName: "mohammad",
		myLastName: "nikbakht",
	};
	const user = {
		userName: "mohamamd",
		age: 24,
	};
	console.log(JSON.stringify(ret));
	return JSON.stringify(ret);
}
