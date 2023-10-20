export const rabbitConfig = {
	rabbitmq: {
		url: "amqp://127.0.0.1:5672", // RabbitMQ server URL
		exchange: "direct", // Name of the exchange
		routingKey: "basicInfo", // Routing key for the binding
		options: {
			durable: false, // Exchange and queue options
		},
	},
};
