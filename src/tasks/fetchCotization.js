import scheduler from 'toad-scheduler';
import fetch from 'node-fetch';
import fixerioConfig from '../config/fixerio.js'
import cotizationController from '../controllers/cotizationController.js';

const {URI, KEY, FORMAT} = fixerioConfig;
const { ToadScheduler, SimpleIntervalJob, AsyncTask } = scheduler;


export default () => {
    const scheduler = new ToadScheduler()

    const task = new AsyncTask('simple task', () => {
        return (
        fetch(`${URI}?access_key=${KEY}&format=${FORMAT}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((resParsed) => {
                if(resParsed){
                    cotizationController.saveCotization(resParsed);
                }
            })
            .catch((error) => {
                console.log(`Error retrieving cotizations:\n ${error}`);
            }));

    }, (err) => {
        console.log(`Error running scheduler:\n ${err}`)
    })
    const job = new SimpleIntervalJob({ seconds: 10, }, task)
    scheduler.addSimpleIntervalJob(job)
}
