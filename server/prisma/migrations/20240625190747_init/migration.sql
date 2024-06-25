-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "action_id" TEXT NOT NULL,
    "action_name" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "target_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "group" TEXT NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_actor_id_idx" ON "Event"("actor_id");

-- CreateIndex
CREATE INDEX "Event_action_id_idx" ON "Event"("action_id");

-- CreateIndex
CREATE INDEX "Event_target_id_idx" ON "Event"("target_id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
