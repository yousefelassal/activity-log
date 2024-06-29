import { baseUrl, cn } from '@/lib/utils'
import { useState, forwardRef, useImperativeHandle } from 'react'
import useSWR from 'swr'
import { getEventsFilterOptions } from '@/services/events'
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterPopover = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()

    const { data, isLoading, error } = useSWR(isOpen ? `${baseUrl}/events/filter-options` : null, getEventsFilterOptions)

    const [selectedActorKeys, setSelectedActorKeys] = useState<string[]>(searchParams.get('actorId')?.split(',') ?? [])
    const [selectedActionKeys, setSelectedActionKeys] = useState<string[]>(searchParams.get('actionName')?.split(',') ?? [])
    const [selectedTargetKeys, setSelectedTargetKeys] = useState<string[]>(searchParams.get('targetId')?.split(',') ?? [])

    useImperativeHandle(ref, () => ({
        toggle: () => setIsOpen(!isOpen)
    }))

    const onActorChange = (e: React.ChangeEvent<HTMLInputElement>, actorId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.checked) {
            setSelectedActorKeys([...selectedActorKeys, actorId]);
            params.set('actorId', [...selectedActorKeys, actorId].join(','));
        } else {
            setSelectedActorKeys(selectedActorKeys.filter((key) => key !== actorId));
            params.set('actorId', selectedActorKeys.filter((key) => key !== actorId).join(','));
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const onActionChange = (e: React.ChangeEvent<HTMLInputElement>, actionName: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.checked) {
            setSelectedActionKeys([...selectedActionKeys, actionName]);
            params.set('actionName', [...selectedActionKeys, actionName].join(','));
        } else {
            setSelectedActionKeys(selectedActionKeys.filter((key) => key !== actionName));
            params.set('actionName', selectedActionKeys.filter((key) => key !== actionName).join(','));
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const onTargetChange = (e: React.ChangeEvent<HTMLInputElement>, targetId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.checked) {
            setSelectedTargetKeys([...selectedTargetKeys, targetId]);
            params.set('targetId', [...selectedTargetKeys, targetId].join(','));
        } else {
            setSelectedTargetKeys(selectedTargetKeys.filter((id) => id !== targetId));
            params.set('targetId', selectedTargetKeys.filter((id) => id !== targetId).join(','));
        }
        replace(`${pathname}?${params.toString()}`);
    }


    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            )}
            <div className={cn("hidden absolute z-50 left-0 lg:-left-28 top-[46px] w-72 h-64 overflow-auto bg-white rounded-md shadow-sm border border-[#E0E0E0] text-[#575757] text-[10px] origin-top-left lg:origin-top",
                isOpen && "flex flex-col animate-fadeAndScaleIn"
            )}>
                <div className="grid gap-y-1 divide-y p-4">
                    {error && <div>Error loading filter options</div>}
                    {isLoading && <>
                        <div>
                            <div className="h-[20px] w-[70px] rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                            <div className="mt-1 grid gap-y-1">
                                <div className="h-[18px] w-full rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                                <div className="h-[18px] w-full rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                                <div className="h-[18px] w-full rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="h-[20px] w-[70px] rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                            <div className="mt-1 grid gap-y-1">
                                <div className="h-[18px] w-full rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                                <div className="h-[18px] w-full rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                                <div className="h-[18px] w-full rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                                <div className="h-[18px] w-full rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                            </div>
                        </div>
                    </>}
                    {data && (
                        <>
                            <div>
                                <div className="text-[#575757] text-[14px] font-semibold">Actor</div>
                                <div className="grid gap-y-1">
                                    {data.actors.map((actor) => (
                                        <label key={actor.actor_id} className="flex w-full items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedActorKeys.includes(actor.actor_id)}
                                                onChange={(e) => onActorChange(e, actor.actor_id)}
                                            />
                                            <div className="w-full flex justify-between items-center">
                                                <span>{actor.actor_id}</span>
                                                <span>{actor._count.actor_id}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="mt-1 text-[#575757] text-[14px] font-semibold">Action</div>
                                <div className="grid gap-y-1">
                                    {data.actionNames.map((action) => (
                                        <label key={action.action_name} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedActionKeys.includes(action.action_name)}
                                                onChange={(e) => onActionChange(e, action.action_name)}
                                            />
                                            <div className="w-full flex justify-between items-center">
                                                <span>{action.action_name}</span>
                                                <span>{action._count.action_name}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="mt-1 text-[#575757] text-[14px] font-semibold">Target</div>
                                <div className="grid gap-y-1">
                                    {data.targets.map((target) => (
                                        <label key={target.target_id} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedTargetKeys.includes(target.target_id)}
                                                onChange={(e) => onTargetChange(e, target.target_id)}
                                            />
                                            <div className="w-full flex justify-between items-center">
                                                <span>{target.target_id}</span>
                                                <span>{target._count.target_id}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
})

FilterPopover.displayName = 'FilterPopover'

export default FilterPopover