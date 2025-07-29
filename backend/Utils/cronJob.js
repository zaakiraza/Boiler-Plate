import { CronJob } from 'cron';

const job = new CronJob(
	'* * * * * *',
	function () {
		console.log('You will see this message every second');
	},
	null,
	true,
	'America/Los_Angeles'
);

export default job;