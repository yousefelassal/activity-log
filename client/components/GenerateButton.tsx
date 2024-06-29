import { instalog } from "@/services/events"
import { useState } from "react"

const GenerateButton = ({ mutate }:{ mutate: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)
  const generateRandomEvent = async () => {
    setIsLoading(true)
    const userIds = ["user_9N8UBQ45Y3", "user_ZOXNS7E7HV", "user_6Y2PN4K06C"]
    const actionNames = ["user.invited_teammate", "user.searched_activity_log_events", "user.login_succeeded", "incident.create_succeeded"]

    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)]
    const randomActionName = actionNames[Math.floor(Math.random() * actionNames.length)]
    try {
        await instalog.createEvent(
            {
                "object": "event",
                "actor_id": randomUserId,
                "action": {
                    "id": "evt_action_PGTD81NCAOQ2",
                    "object": "event_action",
                    "name": randomActionName
                },
                "target_id": "user_DOKVD1U3L030",
                "target_name": "ali@instatus.com",
                "location": "105.40.62.95",
                "metadata": {
                    "redirect": "/search",
                    "description": "User searched for activity log events",
                    "x_request_id": "req_W1Y13QOHMI5H"
                },
            }
        );
        mutate();
    } catch (error) {
        console.error(error)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <button
        className="flex items-center justify-center bg-foreground text-sm font-normal border border-border rounded-md w-[200px] py-2 hover:bg-foreground/70 transition-colors"
        onClick={generateRandomEvent}
        disabled={isLoading}
    >
        {isLoading ? "Generating..." : "Generate Random Event"}
    </button>
  )
}

export default GenerateButton