echo "Building Libraries to ensure binaries are available..."
for file in apps/**/**/*.prisma
do
    echo "Generating ${file##*/}" 
    npx prisma generate --schema=${file}
done