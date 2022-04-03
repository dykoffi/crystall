-- CreateTable
CREATE TABLE "Token_" (
    "id" SERIAL NOT NULL,
    "value" TEXT,
    "pass" TEXT,

    CONSTRAINT "Token__pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log_" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "protocol" TEXT,
    "method" TEXT,
    "hostname" TEXT,
    "path" TEXT,
    "httpVersion" TEXT,
    "statusCode" INTEGER,
    "userIp" TEXT,
    "userReferer" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "Log__pkey" PRIMARY KEY ("id")
);
