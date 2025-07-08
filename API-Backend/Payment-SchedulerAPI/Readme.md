npm install @mailchimp/mailchimp_transactional



## 1. **Add a new pickup location** (`POST /add-pickup-location`)

**Endpoint:** `POST https://apiv2.shiprocket.in/v1/external/settings/company/addpickup`

**Required JSON body:**

```json
{
  "pickup_location": "string",   // nickname (max 36 chars), e.g. "Warehouse A"
  "name": "string",              // shipper's name
  "email": "string",             // shipper's email
  "phone": "string or integer",  // 10-digit mobile
  "address": "string",           // main address (≤ 80 chars)
  "city": "string",
  "state": "string",
  "country": "string",           // usually "India"
  "pin_code": "string or integer"
}
```

**Optional fields:**

* `address_2`, `lat`, `long`, `gstin`, `address_type`, `vendor_name`, `alternate_phone` ([postman.com][1])

---

## 2. **Get delivery price** (`GET /get-delivery-price`)

**Endpoint:** typically `GET /courier/serviceability/`

**Expected query parameters** (via `req.query`):

* `pickup_postcode` (string/int)
* `delivery_postcode` (string/int)
* `cod` (boolean `true`/`false`)
* `weight` (decimal in kg)
* `dimensions` maybe accepted (`length`, `breadth`, `height`)

Exact parameter names can vary—consult your existing helper method’s implementation.

---

## 3. **Place a new order** (`POST /place-order`)

**Endpoint:** `POST https://apiv2.shiprocket.in/v1/external/international/orders/create/adhoc` (or domestic version)

**Minimum required JSON:**

```json
{
  "order_id": "string",              // merchant's unique ID
  "order_date": "YYYY-MM-DD",
  "pickup_location": "string",       // must match a registered pickup location
  "channel_id": integer,             // channel (if using)
  "billing_customer_name": "string",
  "billing_last_name": "string",
  "billing_address": "string",
  "billing_city": "string",
  "billing_state": "string",
  "billing_country": "string",
  "billing_pincode": "string",
  "billing_email": "string",
  "billing_phone": "string",
  "shipping_is_billing": boolean,
  "shipping_customer_name": "string",
  "shipping_last_name": "string",
  "shipping_address": "string",
  "shipping_city": "string",
  "shipping_state": "string",
  "shipping_country": "string",
  "shipping_pincode": "string",
  "shipping_email": "string",
  "shipping_phone": "string",
  "weight": number,                  // total weight in kg
  "length": number,                  // optional dimensions
  "breadth": number,
  "height": number,
  "value": number,                   // product value
  "cod": boolean,
  "cod_amount": number               // if COD=true
}
```

**For multiple items**, you can pass a `products` array under the body. ([postman.com][2], [stackoverflow.com][3])

---

## 4. **Request pickup** (`POST /request-pickup`)

**Endpoint:** `POST https://apiv2.shiprocket.in/v1/external/courier/generate/pickup`

**Required JSON body:**

```json
{
  "shipment_id": integer,        // shipment ID from order response
  "pickup_date": ["YYYY-MM-DD"],// optional array for scheduling
  "status": "retry"             // optional, for retries
}
```

Note: One shipment per request. Airing around holidays, pickup shifts to next working day.&#x20;

---

## 5. **Get tracking details** (`GET /track-shipment/:shipmentId`)

**Endpoint:** `GET https://apiv2.shiprocket.in/v1/external/courier/track/shipment/{shipment_id}`

Or via AWB:

```text
GET /external/courier/track/awb/{awb_code}
```

Uses path param only, e.g., `req.params.shipmentId`. ([packagist.org][4], [github.com][5])

---

## 6. **Get all delivered orders** (`GET /delivered-orders`)

Uses helper like `getAllOrders()`:

```js
const allOrders = await shiprocketHelper.getAllOrders();
const deliveredOrders = allOrders.data.filter(o => o.status === 'Delivered');
```

No additional params needed here.

---

### 🔧 Summary Table

| Route                  | HTTP Method | Parameters (from body/query/params)                           |
| ---------------------- | ----------- | ------------------------------------------------------------- |
| `/add-pickup-location` | POST        | JSON body as in section (1)                                   |
| `/get-delivery-price`  | GET         | `pickup_postcode, delivery_postcode, weight, dimensions, cod` |
| `/place-order`         | POST        | JSON body as in section (3)                                   |
| `/request-pickup`      | POST        | `{ shipment_id, pickup_date?, status? }`                      |
| `/track-shipment/:id`  | GET         | Path param `shipmentId`                                       |
| `/delivered-orders`    | GET         | No params                                                     |

---

