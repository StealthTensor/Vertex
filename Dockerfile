# --- Stage 1: Build Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy source and build (creates /dist folder)
COPY frontend/ .
RUN npm run build

# --- Stage 2: Build Backend ---
FROM golang:1.23-alpine AS backend-builder
WORKDIR /app/backend

# Copy Go module files and download deps
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy the rest of the backend code
COPY backend/ .

# CRITICAL: Copy the built frontend into the Go source folder so it can be embedded
# We place it in 'src/dist' because your main.go is inside 'src'
COPY --from=frontend-builder /app/frontend/dist ./src/dist

# Build the Go binary
WORKDIR /app/backend/src
RUN go build -o vertex-app .

# --- Stage 3: Final Production Image ---
FROM alpine:latest
WORKDIR /root/

# Copy the binary from the builder stage
COPY --from=backend-builder /app/backend/src/vertex-app .

# Expose the port your app runs on
EXPOSE 8080

# Run the app
CMD ["./vertex-app"]