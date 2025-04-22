import React, { useEffect, useState } from 'react';
import { Card, Chip, Typography, Stack } from '@mui/material';
import { useRegionStore } from '../store/useRegionStore.ts';
import { getSubscribedRegions, updateSubscribedRegions } from '../api/appwrite.ts';
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
} from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';

function DroppableContainer({ id, children }: { id: string; children: React.ReactNode }) {
    const { setNodeRef } = useDroppable({ id });
    return <div ref={setNodeRef}>{children}</div>;
}

function DraggableChip({ id, label }: { id: string; label: string }) {
    const { attributes, listeners, setNodeRef } = useDraggable({ id });

    const style = {
        cursor: 'grab',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Chip label={label} size="small" sx={{ backgroundColor: '#333', color: '#fff' }} />
        </div>
    );
}

export default function RegionsCard() {
    const { regions } = useRegionStore();
    const [subscribedRegionsID, setSubscribedRegionsID] = useState<string[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        getSubscribedRegions().then((data) => {
            setSubscribedRegionsID(data || []);
        });
    }, []);

    const availableRegions = regions.filter((region) => !subscribedRegionsID.includes(region.regionID));
    const subscribedRegions = regions.filter((region) => subscribedRegionsID.includes(region.regionID));

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over) return;

        const activeId = String(active.id);
        const overId = String(over.id);

        const isInAvailable = availableRegions.some((r) => r.regionID === activeId);
        const isInSubscribed = subscribedRegionsID.includes(activeId);

        if (isInAvailable && overId === 'subscribed-dropzone') {
            setSubscribedRegionsID((prev) => {
                const updated = [...prev, activeId];
                updateSubscribedRegions(updated);
                return updated;
            });
        }

        if (isInSubscribed && overId === 'available-dropzone') {
            setSubscribedRegionsID((prev) => {
                const updated = prev.filter((id) => id !== activeId);
                updateSubscribedRegions(updated);
                return updated;
            });
        }
    };

    const activeRegion = regions.find((r) => r.regionID === activeId);

    return (
        <Card
            sx={{
                ml: 5,
                mt: 5,
                width: 700,
                height: 500,
                p: 2,
                borderRadius: 5,
                backgroundColor: '#1e1e1e',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h6" fontWeight="bold" mb={0.1}>
                Available Regions
            </Typography>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <DroppableContainer id="available-dropzone">
                    <Stack direction="row" flexWrap="wrap" gap={0.5} mt={0.5}>
                        {availableRegions.map((region) => (
                            <DraggableChip key={region.regionID} id={region.regionID} label={region.name} />
                        ))}
                    </Stack>
                </DroppableContainer>

                <Typography variant="h6" fontWeight="bold" mt={2}>
                    Subscribed Regions
                </Typography>

                <DroppableContainer id="subscribed-dropzone">
                    <Stack direction="row" flexWrap="wrap" gap={0.5} mt={0.5}>
                        {subscribedRegions.map((region) => (
                            <DraggableChip key={region.regionID} id={region.regionID} label={region.name} />
                        ))}
                    </Stack>
                </DroppableContainer>

                <DragOverlay>
                    {activeRegion ? (
                        <Chip
                            label={activeRegion.name}
                            size="small"
                            sx={{
                                backgroundColor: '#333',
                                color: '#fff',
                                transform: 'scale(1.05)',
                                transition: 'transform 0.1s ease-in-out',
                            }}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </Card>
    );
}
