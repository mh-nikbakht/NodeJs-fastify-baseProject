const getCountriesController = async function (
	request: any,
	response: any,
	done: any
) {
	return response.code(200).send({
		message: "this route Work successfully :)",
	});
};
export { getCountriesController };
