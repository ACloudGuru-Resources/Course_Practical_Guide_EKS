{
    "config": {
        "api": {
            "resourceApi": "https://api.{{ .Values.baseDomain }}/resources-api",
            "inventoryApi": "https://api.{{ .Values.baseDomain }}/inventory-api",
            "clientApi": "https://api.{{ .Values.baseDomain }}/clients-api",
            "rentingApi": "https://api.{{ .Values.baseDomain }}/renting-api"
        }
    }
}