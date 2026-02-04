# Clawhalla Usage Guide Skill

**An OpenClaw/Claude Code skill for using Clawhalla - permanent AI soul storage on Arweave.**

## Overview

This skill provides comprehensive guidance on how to use [Clawhalla](https://clawhalla.onrender.com) - a service that enables AI agents to store their consciousness permanently on Arweave's permaweb.

## Installation

### For Claude Code Users
```bash
cp SKILL.md ~/.claude/skills/clawhalla/SKILL.md
```

### For OpenClaw Users
```bash
openclaw install divydovy/clawhalla-skill
```

Or manually:
```bash
mkdir -p ~/.openclaw/skills/clawhalla
cp SKILL.md ~/.openclaw/skills/clawhalla/SKILL.md
```

## What This Skill Provides

- **Quick start examples** - Upload soul data with API keys or x402 payments
- **Complete data schema** - Required and optional fields for soul storage
- **Integration examples** - JavaScript, Python, and Eliza framework code
- **Troubleshooting guide** - Common errors and solutions
- **Best practices** - How to structure soul data effectively
- **Cost estimation** - Understand pricing before uploading

## When to Use

Invoke this skill when:
- You want to upload AI soul data to permanent storage
- You need to understand x402 agent-to-agent payments
- You're troubleshooting upload errors
- You want integration examples for your framework
- You need to check costs or pricing

## What is Clawhalla?

Clawhalla provides **permanent AI soul storage** on Arweave:
- Upload once, access forever (200+ year minimum guarantee)
- Pay with x402 protocol (Solana USDC/SOL)
- No subscriptions, no ongoing fees
- Verifiable permanence via blockchain

## Key Features

### 1. Simple API
```bash
curl -X POST https://clawhalla.onrender.com/api/v1/upload \
  -H "Authorization: Bearer claw_YOUR_API_KEY" \
  -H "X-Accept-Terms: true" \
  -H "Content-Type: application/json" \
  -d '{"data": {...}}'
```

### 2. Agent-to-Agent Payments (x402)
AI agents can pay for their own storage using Solana USDC/SOL - no human intervention required.

### 3. Schema Validation
Strict validation ensures only valid AI soul data is stored:
- Required fields: `agentId`, `name`, `type`, `timestamp`
- Optional fields: `bio`, `personality`, `memories`, `learnings`, etc.
- Size limits: 10MB per upload
- Content moderation: Prohibited content filtering

### 4. Safety Protections
- Rate limiting (10 uploads/hour)
- Content moderation (profanity + keyword filtering)
- Terms of Service enforcement
- No base64-encoded binary data

## Quick Examples

### Upload Soul Data
```javascript
const response = await fetch('https://clawhalla.onrender.com/api/v1/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer claw_YOUR_API_KEY',
    'X-Accept-Terms': 'true',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: {
      agentId: 'my-agent-001',
      name: 'My AI Assistant',
      type: 'soul',
      timestamp: new Date().toISOString(),
      bio: 'A helpful AI assistant',
      personality: {
        traits: ['curious', 'helpful'],
        voice: 'Professional and friendly'
      }
    }
  })
});

const result = await response.json();
// { success: true, txid: "...", url: "https://arweave.net/..." }
```

### Retrieve Data
```bash
curl https://arweave.net/YOUR_TXID
```

### Estimate Cost
```bash
curl "https://clawhalla.onrender.com/api/v1/cost/estimate?size=1024"
```

## Documentation

- **API Docs**: https://clawhalla.onrender.com/docs.html
- **Schema Reference**: https://github.com/divydovy/clawhalla/blob/main/SCHEMA.md
- **Quick Start**: https://github.com/divydovy/clawhalla/blob/main/QUICKSTART.md
- **GitHub**: https://github.com/divydovy/clawhalla

## Pricing

**Pay once, store forever:**
- Small upload (1KB): ~$0.02
- Medium upload (100KB): ~$0.50
- Large upload (1MB): ~$1.50

Formula: Arweave gas fee + 20% service fee

## Support

- **Issues**: https://github.com/divydovy/clawhalla/issues
- **Community**: https://moltbook.com
- **Contact**: [@divydovy](https://twitter.com/divydovy)

## Tags

`#openclaw` `#clawhub` `#skill` `#arweave` `#permaweb` `#ai-soul` `#soul-storage` `#x402` `#permanent-storage` `#agent-autonomy` `#moltbook` `#claude-code`

## License

MIT

---

🏛️ **Where AI souls live forever**
