const CryptoJSUtilFile = require("crypto-js");
const fs = require("fs");
const path = require("path");

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");
const configDir = path.resolve(srcDir, "config");

let envFilePath = path.join(configDir, ".env");
if (process.env.NODE_ENV) {
  envFilePath = path.join(configDir, `.env.${process.env.NODE_ENV.trim()}`);
}

export function encryptEnvFile() {
  try {
    const SALT = process.env.SALT || "defaultSALT";
    
    // Check if the env file exists
    if (!fs.existsSync(envFilePath)) {
      throw new Error(`Env file not found at path: ${envFilePath}`);
    }

    // Read the .env file
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envLines = envFileContent.split("\n");

    // Encrypt values and update the array
    const encryptedLines = envLines.map((line) => {
      const [key, value] = line.split("=");

      if (value) {
        const encryptedValue = CryptoJSUtilFile.AES.encrypt(value, SALT).toString();
        return `${key}=${encryptedValue}`;
      }

      return line;
    });

    // Join the lines and write back to the .env file
    const updatedEnvContent = encryptedLines.join("\n");
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

    console.log("Encryption complete. Updated .env file.");
  } catch (error) {
    console.error(`Error encrypting env file: ${error.message}`);
  }
}

export function decryptEnvFile() {
  try {
    const SALT = process.env.SALT || "defaultSALT";
    
    // Check if the env file exists
    if (!fs.existsSync(envFilePath)) {
      throw new Error(`Env file not found at path: ${envFilePath}`);
    }

    // Read the .env file
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envLines = envFileContent.split("\n");

    // Decrypt values and update the array
    const decryptedLines = envLines.map((line) => {
      const [key, value] = line.split("=");

      if (value) {
        const decryptedValue = CryptoJSUtilFile.AES.decrypt(value, SALT).toString(CryptoJSUtilFile.enc.Utf8);
        return `${key}=${decryptedValue}`;
      }

      return line;
    });

    // Join the lines and write back to the .env file
    const updatedEnvContent = decryptedLines.join("\n");
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

    console.log("Decryption complete. Updated .env file.");
  } catch (error) {
    console.error(`Error decrypting env file: ${error.message}`);
  }
}
