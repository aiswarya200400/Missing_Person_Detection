import hashlib, time

blockchain = []

def add_block(case_id: int):
    timestamp = time.time()
    block_data = f"{case_id}-{timestamp}"
    block_hash = hashlib.sha256(block_data.encode()).hexdigest()

    blockchain.append({
        "case_id": case_id,
        "hash": block_hash,
        "timestamp": timestamp
    })

    return block_hash
