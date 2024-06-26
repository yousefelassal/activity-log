const InstaLog = require('./index');
const instalog = new InstaLog('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6IklOU1RBVFVTLVBMS0FEU0lRMzIwIiwiaWF0IjoxNzE5NDExODc1fQ.qe8-fAwmXPiU0w8VsJ7BRBDGR2pB_OyjPiFguh_irJU');

instalog.listEvents({ limit: 2 }).then((events) => {
    console.log(events);
});

const eventObject = {
    "id": "evt_15B56WILKW5K",
    "object": "event",
    "actor_id": "user_40784afc-bad4-5a76-a916-5b66bf1774bf",
    "action": {
        "id": "evt_action_PGTD81NCAOQ2",
        "object": "event_action",
        "name": "user.login_succeeded"
    },
    "target_id": "user_DOKVD1U3L030",
    "target_name": "ali@instatus.com",
    "location": "105.40.62.95",
    "occurred_at": "2022-01-05T14:31:13.607Z",
    "metadata": {
        "redirect": "/setup",
        "description": "User login succeeded.",
        "x_request_id": "req_W1Y13QOHMI5H"
    },
};

instalog.createEvent(eventObject).then((event) => {
    console.log('Event created:', event);
});