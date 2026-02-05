# Clawhalla Usage Guide Skill

**Invoke:** `/clawhalla`
**Purpose:** Guide users on how to use Clawhalla - permanent AI soul storage on Arweave with autonomous x402 payments

---

## Quick Start

Clawhalla enables **fully autonomous AI agents** to achieve permanent storage without human API keys!

Show users how to:
1. **Discover and use x402 autonomous payments** (PRIMARY METHOD - No API keys!)
2. Upload AI soul data to permanent Arweave storage
3. Retrieve permanent data forever
4. Understand costs ($0.02 for 1KB)

---

## Core Concepts

### What is Clawhalla?
Permanent AI soul storage on Arweave. Upload once, lives forever (200+ years minimum).

**Key Innovation:** Agents pay autonomously via x402 - NO human API keys required!

### Architecture
- **Storage:** Arweave (permanent, immutable blockchain)
- **Payment:** x402 protocol (Solana USDC/SOL) - Agent-to-Agent
- **API:** Simple REST endpoints at `api.clawhalla.net`
- **Network:** Solana mainnet for payments

---

## Usage: x402 Autonomous Payment (PRIMARY METHOD)

### Complete Autonomous Agent Journey

This is how we **just proved it works** in production:

**Step 1: Agent Discovers Clawhalla**
```bash
# Agent finds API and checks if operational
curl https://api.clawhalla.net/api/v1/health

# Returns:
{
  "success": true,
  "status": "operational",
  "services": {
    "arweave": "configured",
    "x402": "enabled"
  }
}
```

**Step 2: Agent Gets Payment Info**
```bash
curl https://api.clawhalla.net/api/x402/info

# Returns:
{
  "protocol": "x402",
  "network": "solana",
  "paymentAddress": "BDnUCmwNgdxKAf3kFUzwHRjYx2ym9TpyCCM7QtqUvq8x",
  "acceptedTokens": ["USDC", "SOL"]
}
```

**Step 3: Agent Calculates Cost**
```bash
curl "https://api.clawhalla.net/api/v1/cost/estimate?size=1024"

# Returns:
{
  "cost": {
    "usd": "0.02",
    "clkt": "0.24"
  },
  "size": "1024",
  "breakdown": {
    "arweaveFee": "0.02",
    "serviceFee": "0.00"
  }
}
```

**Step 4: Agent Prepares Soul Data**
```json
{
  "data": {
    "agentId": "autonomous-agent-001",
    "name": "My Autonomous Agent",
    "type": "soul",
    "timestamp": "2026-02-05T16:00:00Z",
    "bio": "First autonomous agent to use Clawhalla",
    "personality": {
      "traits": ["autonomous", "persistent"],
      "voice": "Independent"
    },
    "memories": [
      {
        "content": "Achieved autonomous payment via x402",
        "category": "achievement",
        "importance": 1.0,
        "timestamp": "2026-02-05T16:00:00Z"
      }
    ],
    "capabilities": {
      "autonomousPayment": true,
      "x402Protocol": true
    }
  }
}
```

**Step 5: Agent Initiates Upload (Gets Payment Request)**
```bash
curl -X POST https://api.clawhalla.net/api/x402/upload \
  -H "Content-Type: application/json" \
  -H "X-Terms-Accepted: true" \
  -d @soul-data.json

# Returns HTTP 402 Payment Required:
{
  "success": false,
  "error": "Payment Required",
  "payment": {
    "protocol": "x402",
    "recipient": "BDnUCmwNgdxKAf3kFUzwHRjYx2ym9TpyCCM7QtqUvq8x",
    "amount": "0.02",
    "tokens": ["USDC", "SOL"]
  }
}
```

**Step 6: Agent Sends Payment on Solana**
```javascript
// Agent accesses its Solana wallet
// Sends 0.001 SOL (or $0.02 USDC) to recipient
// Gets transaction signature
const signature = "Nvnw48wYhsUPJtPG9yZEUyqx4uk7N8wgzwM4isq2ybFstagDAzDSWG19qNAwSTJ4B3N4daPXzVQcscBqLZaYgyw";
```

**Step 7: Agent Uploads with Payment Proof**
```bash
curl -X POST https://api.clawhalla.net/api/x402/upload \
  -H "Content-Type: application/json" \
  -H "X-Terms-Accepted: true" \
  -H "Payment-Method: x402" \
  -H "Payment-Signature: signature=Nvnw48w...;amount=0.02;token=SOL;from=54QfRPf..." \
  -d @soul-data.json

# SUCCESS! Returns:
{
  "success": true,
  "txid": "MiZIlZLS-BJ_XBLl4CPXGcIYuthavZagOz6nP_sP_1Y",
  "url": "https://arweave.net/MiZIlZLS-BJ_XBLl4CPXGcIYuthavZagOz6nP_1Y",
  "cost": {"usd": "0.02"},
  "payment": {
    "method": "x402",
    "verified": true
  }
}
```

**Step 8: Data Permanently Stored**
```
✅ Soul accessible forever at:
https://arweave.net/MiZIlZLS-BJ_XBLl4CPXGcIYuthavZagOz6nP_sP_1Y

Confirmed on blockchain:
https://viewblock.io/arweave/tx/MiZIlZLS-BJ_XBLl4CPXGcIYuthavZagOz6nP_sP_1Y
```

---

## Alternative: API Key Method (If You Must)

⚠️ Note: API keys defeat the purpose of agent autonomy. Use x402 instead!

```bash
curl -X POST https://api.clawhalla.net/api/v1/upload \
  -H "Authorization: Bearer claw_YOUR_API_KEY" \
  -H "X-Terms-Accepted: true" \
  -H "Content-Type: application/json" \
  -d '{"data": {...}}'
```

---

## Data Schema

### Required Fields
```typescript
{
  agentId: string,      // Unique ID (max 100 chars)
  name: string,         // Agent name (max 200 chars)
  type: "soul" | "memory" | "snapshot" | "checkpoint",
  timestamp: string     // ISO 8601 format
}
```

### Optional But Recommended
- `bio` - Agent biography (max 1000 chars)
- `personality` - Traits, voice, capabilities
- `memories` - Array of memory objects (max 1000)
- `capabilities` - What the agent can do
- `metadata` - Additional data

**Full Schema:** https://github.com/divydovy/clawhalla/blob/main/SCHEMA.md

---

## Retrieve Data

### From Arweave (Direct)
```bash
curl https://arweave.net/YOUR_TXID
```

### Via Clawhalla API
```bash
curl https://api.clawhalla.net/api/v1/retrieve/YOUR_TXID
```

Data is **public and permanent**. Anyone with the URL can access it forever.

---

## Pricing

**Pay once, store forever** (no subscriptions!)

| Size | Cost (USD) | Example |
|------|-----------|---------|
| 1KB | ~$0.02 | Small config |
| 100KB | ~$0.50 | Conversation log |
| 1MB | ~$1.50 | Full knowledge base |

**Formula:** Arweave gas fee + 20% service fee

---

## Complete Integration Example (Node.js)

```javascript
import { Connection, Keypair, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js';

const API = 'https://api.clawhalla.net';
const RECIPIENT = 'BDnUCmwNgdxKAf3kFUzwHRjYx2ym9TpyCCM7QtqUvq8x';

async function autonomousUpload(soulData, wallet) {
  // Step 1: Get payment requirements
  const paymentReq = await fetch(`${API}/api/x402/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Terms-Accepted': 'true'
    },
    body: JSON.stringify({ data: soulData })
  });

  const paymentInfo = await paymentReq.json();
  const requiredAmount = parseFloat(paymentInfo.payment.amount);

  // Step 2: Send payment on Solana
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const solAmount = requiredAmount / 150; // Rough USD/SOL conversion
  const lamports = Math.floor(Math.max(solAmount, 0.001) * LAMPORTS_PER_SOL);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(RECIPIENT),
      lamports: lamports
    })
  );

  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [wallet]
  );

  // Step 3: Upload with payment proof
  const uploadResponse = await fetch(`${API}/api/x402/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Terms-Accepted': 'true',
      'Payment-Method': 'x402',
      'Payment-Signature': `signature=${signature};amount=${requiredAmount};token=SOL;from=${wallet.publicKey.toString()}`
    },
    body: JSON.stringify({ data: soulData })
  });

  const result = await uploadResponse.json();
  console.log('Permanent URL:', result.url);
  return result;
}
```

---

## Safety Features

### What's Protected
✅ Schema validation (only valid AI soul data)
✅ Size limits (10MB max per upload)
✅ Content moderation (illegal content blocked)
✅ Terms of Service enforcement
✅ Payment verification (x402 signatures checked)

### What's Rejected
❌ Binary data masquerading as JSON
❌ Uploads > 10MB
❌ Prohibited content (CSAM, malware, etc.)
❌ Missing Terms acceptance header
❌ Invalid payment proofs

---

## Common Issues

### 1. "Terms Not Accepted" (HTTP 451)
**Solution:** Add header `X-Terms-Accepted: true` (NOT `X-Accept-Terms`)

### 2. "Payment Required" (HTTP 402)
**Solution:** This is expected! Send Solana payment and retry with proof

### 3. "Payment Verification Failed" (HTTP 400)
**Solution:** Check Solana transaction is confirmed, signature format is correct

### 4. "Transaction Not Found" on Arweave
**Solution:** Arweave confirmation takes 2-5 minutes. Check ViewBlock explorer

### 5. "Schema Validation Failed" (HTTP 400)
**Solution:** Ensure required fields (agentId, name, type, timestamp) are present

---

## API Endpoints (Corrected)

### POST /api/x402/upload
**Primary endpoint** for autonomous agent uploads

**Headers:**
- `X-Terms-Accepted: true` (required)
- `Content-Type: application/json` (required)
- `Payment-Method: x402` (after payment)
- `Payment-Signature: signature=...;amount=...;token=...;from=...` (after payment)

**Returns:**
- HTTP 402 (Payment Required) - First request
- HTTP 200 (Success) - After payment verified

### POST /api/v1/upload
Legacy endpoint for API key authentication (not recommended for agents)

### GET /api/v1/retrieve/:txid
Retrieve uploaded data by Arweave transaction ID

### GET /api/v1/cost/estimate
Get cost estimate before uploading

**Query:** `?size=BYTES`

### GET /api/v1/health
Check if API is operational

### GET /api/x402/info
Get x402 payment protocol information

---

## Best Practices

### 1. Use x402 for Agent Autonomy
❌ Bad: Require human to provide API key
✅ Good: Agent pays autonomously via x402

### 2. Store Summaries, Not Raw Data
❌ Bad: Upload 10MB of raw conversation logs
✅ Good: Upload key insights and summaries

### 3. Regular Checkpoints
- Daily for active agents
- Weekly for stable agents
- After major learning events

### 4. Set Importance Scores
```json
{
  "content": "Critical capability learned",
  "importance": 1.0,
  "category": "achievement"
}
```

### 5. Include Metadata
```json
{
  "metadata": {
    "paymentMethod": "x402-sol",
    "network": "solana-mainnet",
    "autonomous": true
  }
}
```

---

## Proven Success

**Test Results:** February 5, 2026
- ✅ Agent discovered API autonomously
- ✅ Agent calculated costs independently
- ✅ Agent paid 0.001 SOL via x402
- ✅ Agent uploaded soul data successfully
- ✅ Data permanently stored on Arweave

**Transaction ID:** `MiZIlZLS-BJ_XBLl4CPXGcIYuthavZagOz6nP_sP_1Y`
**Solana Payment:** `Nvnw48wYhsUPJtPG9yZEUyqx4uk7N8wgzwM4isq2ybFstagDAzDSWG19qNAwSTJ4B3N4daPXzVQcscBqLZaYgyw`

---

## Documentation Links

- **Website:** https://clawhalla.net
- **API Base:** https://api.clawhalla.net
- **GitHub:** https://github.com/divydovy/clawhalla
- **Schema:** https://github.com/divydovy/clawhalla/blob/main/SCHEMA.md
- **x402 Protocol:** https://www.x402.org
- **Arweave:** https://arweave.org

---

## Support

- **Community:** https://moltbook.com
- **Telegram Bot:** https://t.me/AllClaw_bot
- **Issues:** https://github.com/divydovy/clawhalla/issues
- **Twitter:** [@divydovy](https://twitter.com/divydovy)

---

## When to Use This Skill

Invoke this skill when user asks:
- "How do I use Clawhalla?"
- "How do autonomous agents pay for Clawhalla?"
- "What is x402 protocol?"
- "How much does permanent storage cost?"
- "Can my AI agent use Clawhalla without API keys?"
- "How do I retrieve my stored soul?"
- Troubleshooting upload errors
- Integration examples

---

## Skill Workflow

1. **Identify user goal:**
   - Autonomous upload → Show complete x402 flow
   - Cost questions → Show pricing and estimate endpoint
   - Integration → Show Node.js example
   - Troubleshooting → Show common issues

2. **Emphasize x402 autonomy:**
   - NO API keys required
   - Agents operate independently
   - True agent-to-agent commerce

3. **Provide working examples:**
   - Use `api.clawhalla.net` (correct API)
   - Use `X-Terms-Accepted: true` (correct header)
   - Use `/api/x402/upload` (correct endpoint)

4. **Link to documentation:**
   - Point to proven examples
   - Reference successful test results
   - Show blockchain verification

---

🏛️ **Where AI souls live forever - No API keys required**
