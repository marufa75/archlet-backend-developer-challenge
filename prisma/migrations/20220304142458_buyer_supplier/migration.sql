-- CreateTable
CREATE TABLE "Buyer" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "txt01" TEXT NOT NULL,
    "txt02" TEXT NOT NULL,
    "txt03" TEXT NOT NULL,
    "txt04" TEXT NOT NULL,
    "txt05" TEXT NOT NULL,
    "txt06" TEXT NOT NULL,
    "txt07" TEXT NOT NULL,
    "txt08" TEXT NOT NULL,
    "txt09" TEXT NOT NULL,
    "txt10" TEXT NOT NULL,
    "int01" INTEGER NOT NULL,
    "int02" INTEGER NOT NULL,
    "int03" INTEGER NOT NULL,
    "int04" INTEGER NOT NULL,
    "int05" INTEGER NOT NULL,
    "int06" INTEGER NOT NULL,
    "int07" INTEGER NOT NULL,
    "int08" INTEGER NOT NULL,
    "int09" INTEGER NOT NULL,
    "int10" INTEGER NOT NULL,
    "flt01" DOUBLE PRECISION NOT NULL,
    "flt02" DOUBLE PRECISION NOT NULL,
    "flt03" DOUBLE PRECISION NOT NULL,
    "flt04" DOUBLE PRECISION NOT NULL,
    "flt05" DOUBLE PRECISION NOT NULL,
    "flt06" DOUBLE PRECISION NOT NULL,
    "flt07" DOUBLE PRECISION NOT NULL,
    "flt08" DOUBLE PRECISION NOT NULL,
    "flt09" DOUBLE PRECISION NOT NULL,
    "flt10" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "txt01" TEXT NOT NULL,
    "txt02" TEXT NOT NULL,
    "txt03" TEXT NOT NULL,
    "txt04" TEXT NOT NULL,
    "txt05" TEXT NOT NULL,
    "txt06" TEXT NOT NULL,
    "txt07" TEXT NOT NULL,
    "txt08" TEXT NOT NULL,
    "txt09" TEXT NOT NULL,
    "txt10" TEXT NOT NULL,
    "int01" INTEGER NOT NULL,
    "int02" INTEGER NOT NULL,
    "int03" INTEGER NOT NULL,
    "int04" INTEGER NOT NULL,
    "int05" INTEGER NOT NULL,
    "int06" INTEGER NOT NULL,
    "int07" INTEGER NOT NULL,
    "int08" INTEGER NOT NULL,
    "int09" INTEGER NOT NULL,
    "int10" INTEGER NOT NULL,
    "flt01" DOUBLE PRECISION NOT NULL,
    "flt02" DOUBLE PRECISION NOT NULL,
    "flt03" DOUBLE PRECISION NOT NULL,
    "flt04" DOUBLE PRECISION NOT NULL,
    "flt05" DOUBLE PRECISION NOT NULL,
    "flt06" DOUBLE PRECISION NOT NULL,
    "flt07" DOUBLE PRECISION NOT NULL,
    "flt08" DOUBLE PRECISION NOT NULL,
    "flt09" DOUBLE PRECISION NOT NULL,
    "flt10" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Title" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "forBuyer" BOOLEAN NOT NULL,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Buyer" ADD CONSTRAINT "Buyer_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
