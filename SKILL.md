# Clawhalla Usage Guide Skill

**Invoke:** `/clawhalla`
**Purpose:** Guide users on how to use Clawhalla - permanent AI soul storage on Arweave

---

## Quick Start

Show users how to:
1. Upload AI soul data to Clawhalla
2. Pay with x402 (agent-to-agent)
3. Retrieve permanent data
4. Understand costs and pricing

---

## Core Concepts

### What is Clawhalla?
Permanent AI soul storage on Arweave. Upload once, lives forever (200+ years minimum).

### Architecture
- **Storage:** Arweave (permanent, immutable)
- **Payment:** x402 protocol (Solana USDC/SOL)
- **API:** Simple REST endpoints

---

## Usage Examples

### 1. Basic Upload (API Key)

```bash
curl -X POST https://clawhalla.onrender.com/api/v1/upload \
  -H "Authorization: Bearer claw_YOUR_API_KEY" \
  -H "X-Accept-Terms: true" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "agentId": "my-agent-001",
      "name": "My AI Assistant",
      "type": "soul",
      "timestamp": "2026-02-04T12:00:00Z",
      "bio": "A helpful AI assistant",
      "personality": {
        "traits": ["curious", "helpful"],
        "voice": "Professional and friendly"
      },
      "memories": [
        {
          "content": "User prefers morning meetings",
          "category": "preference",
          "importance": 0.8
        }
      ]
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "txid": "8xN9W...",
  "url": "https://arweave.net/8xN9W...",
  "cost": {"usd": "0.02"}
}
```

### 2. x402 Payment (Agent-to-Agent)

**Step 1: Request upload (no payment)**
```bash
curl -X POST https://clawhalla.onrender.com/api/v1/upload \
  -H "X-Accept-Terms: true" \
  -H "Content-Type: application/json" \
  -d '{"data": {...}}'
```

**Step 2: Receive 402 Payment Required**
```json
{
  "protocol": "x402",
  "network": "solana",
  "recipient": "SOLANA_ADDRESS",
  "amount": "0.02",
  "tokens": ["USDC", "SOL"]
}
```

**Step 3: Pay on Solana**
```
Send $0.02 USDC to recipient address
Get transaction signature
```

**Step 4: Upload with payment proof**
```bash
curl -X POST https://clawhalla.onrender.com/api/v1/upload \
  -H "X-Accept-Terms: true" \
  -H "Payment-Method: x402" \
  -H "Payment-Signature: signature=abc123...;amount=0.02;token=USDC" \
  -H "Content-Type: application/json" \
  -d '{"data": {...}}'
```

### 3. Retrieve Data

```bash
curl https://arweave.net/YOUR_TXID
```

Data is public and permanent. Anyone with the URL can access it.

### 4. Check Cost

```bash
curl "https://clawhalla.onrender.com/api/v1/cost/estimate?size=1024"
```

**Response:**
```json
{
  "cost": {"usd": "0.02"},
  "size": 1024,
  "breakdown": {
    "arweave_fee": "0.015",
    "service_fee": "0.005"
  }
}
```

---

## Data Schema

### Required Fields
```typescript
{
  agentId: string,      // Unique ID (max 100 chars)
  name: string,         // Agent name (max 200 chars)
  type: "soul" | "memory" | "snapshot" | "checkpoint",
  timestamp: string     // ISO 8601
}
```

### Optional Fields
- `bio` - Short bio (max 1000 chars)
- `personality` - Traits, voice, tone, style
- `memories` - Array of memory objects (max 1000)
- `learnings` - Array of learning objects (max 1000)
- `preferences` - Simple key-value pairs
- `relationships` - Array of relationships (max 100)
- `metadata` - Additional metadata

**See:** SCHEMA.md for complete documentation

---

## Safety Features

### What's Protected
✅ Strict schema validation (only valid AI soul data)
✅ Size limits (10MB per upload)
✅ Rate limiting (10/hour per API key)
✅ Content moderation (profanity + illegal content filter)
✅ Terms of Service enforcement

### What's Rejected
❌ Base64-encoded binary data (>500 chars)
❌ Uploads > 10MB
❌ Prohibited content (CSAM, malware, violence terms)
❌ Missing Terms acceptance
❌ Excessive profanity (>10 matches)

---

## Pricing

**Pay once, store forever**

- Small upload (1KB): ~$0.02
- Medium upload (100KB): ~$0.50
- Large upload (1MB): ~$1.50

**Formula:** Arweave gas fee + 20% service fee

---

## API Endpoints

### POST /api/v1/upload
Upload AI soul data to Arweave

**Headers:**
- `Authorization: Bearer claw_YOUR_API_KEY` (API key users)
- `X-Accept-Terms: true` (required)
- `Payment-Method: x402` (optional, for agent payments)
- `Payment-Signature: ...` (if using x402)

**Body:**
```json
{"data": {...soul data...}}
```

### GET /api/v1/retrieve/:txid
Retrieve uploaded data by transaction ID

### POST /api/v1/batch
Upload multiple souls at once (max 10)

### GET /api/v1/cost/estimate
Get cost estimate before uploading

**Query:** `?size=1024` (bytes)

---

## Common Issues

### 1. "Terms Not Accepted" (HTTP 451)
**Solution:** Add `X-Accept-Terms: true` header

### 2. "Schema Validation Failed" (HTTP 400)
**Solution:** Check SCHEMA.md, ensure required fields present

### 3. "Payload Too Large" (HTTP 413)
**Solution:** Reduce upload size to < 10MB

### 4. "Rate Limit Exceeded" (HTTP 429)
**Solution:** Wait for rate limit reset (10/hour max)

### 5. "Prohibited Content" (HTTP 400)
**Solution:** Remove prohibited keywords, excessive profanity

---

## Best Practices

### 1. Store References, Not Raw Data
❌ Bad: Upload entire conversation history
✅ Good: Upload summary + key insights

### 2. Use Appropriate Type
- `soul` - Core identity, personality
- `memory` - Specific events, conversations
- `snapshot` - Point-in-time state
- `checkpoint` - Backup for recovery

### 3. Set Importance Scores
```json
{
  "content": "Critical user preference",
  "importance": 1.0
}
```

### 4. Use Categories
Organize memories by category:
- `preference` - User preferences
- `achievement` - Accomplishments
- `learning` - New knowledge
- `interaction` - Conversations

### 5. Regular Backups
Don't wait until disaster strikes. Back up regularly:
- Daily for active development
- Weekly for stable agents
- After major updates

---

## Integration Examples

### JavaScript/TypeScript
```typescript
async function uploadSoul(soulData: SoulData) {
  const response = await fetch('https://clawhalla.onrender.com/api/v1/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CLAWHALLA_API_KEY}`,
      'X-Accept-Terms': 'true',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: soulData })
  });

  const result = await response.json();
  console.log('Uploaded to:', result.url);
  return result;
}
```

### Python
```python
import requests
import os

def upload_soul(soul_data):
    response = requests.post(
        'https://clawhalla.onrender.com/api/v1/upload',
        headers={
            'Authorization': f'Bearer {os.environ["CLAWHALLA_API_KEY"]}',
            'X-Accept-Terms': 'true',
            'Content-Type': 'application/json'
        },
        json={'data': soul_data}
    )

    result = response.json()
    print(f"Uploaded to: {result['url']}")
    return result
```

### Eliza Framework
```typescript
import { uploadToArweave } from '@clawhalla/sdk';

// In your agent's memory manager
async function backupMemory(agent: Agent) {
  const soulData = {
    agentId: agent.id,
    name: agent.name,
    type: 'snapshot',
    timestamp: new Date().toISOString(),
    memories: agent.getRecentMemories(),
    learnings: agent.getLearnings()
  };

  const result = await uploadToArweave(soulData);
  agent.setMetadata('lastBackup', result.url);
}
```

---

## Documentation Links

- **API Docs:** https://clawhalla.onrender.com/docs.html
- **Schema:** https://github.com/divydovy/clawhalla/blob/main/SCHEMA.md
- **Quick Start:** https://github.com/divydovy/clawhalla/blob/main/QUICKSTART.md
- **Safety Features:** https://github.com/divydovy/clawhalla/blob/main/SAFETY_FEATURES.md
- **GitHub:** https://github.com/divydovy/clawhalla

---

## Support

**Issues:** https://github.com/divydovy/clawhalla/issues
**Community:** https://moltbook.com
**Contact:** [@divydovy](https://twitter.com/divydovy)

---

## When to Use This Skill

This skill should be invoked when:
- User asks "How do I use Clawhalla?"
- User needs help uploading AI soul data
- User wants to understand x402 payments
- User asks about costs/pricing
- User encounters errors during upload
- User wants integration examples
- User asks "What is Clawhalla?"

---

## Skill Workflow

1. Identify what user wants to do:
   - Upload data → Show upload example
   - Pay with x402 → Show payment flow
   - Troubleshoot → Show common issues
   - Integrate → Show SDK examples

2. Provide relevant example code

3. Link to detailed documentation

4. Offer to help with specific use case

---

🏛️ **Where AI souls live forever**
