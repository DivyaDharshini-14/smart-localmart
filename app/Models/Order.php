<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'shop_id',
        'delivery_partner_id',
        'total_amount',
        'status',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
    ];

    /**
     * Order status constants for the lifecycle.
     */
    const STATUS_PLACED = 'placed';
    const STATUS_ACCEPTED = 'accepted';
    const STATUS_PACKED = 'packed';
    const STATUS_PICKED = 'picked';
    const STATUS_DELIVERED = 'delivered';
    const STATUS_CANCELLED = 'cancelled';

    /**
     * Valid status transitions.
     */
    const STATUS_FLOW = [
        self::STATUS_PLACED => self::STATUS_ACCEPTED,
        self::STATUS_ACCEPTED => self::STATUS_PACKED,
        self::STATUS_PACKED => self::STATUS_PICKED,
        self::STATUS_PICKED => self::STATUS_DELIVERED,
    ];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the delivery partner for this order.
     */
    public function deliveryPartner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'delivery_partner_id');
    }

    /**
     * Check if order can transition to next status.
     */
    public function canTransitionTo(string $newStatus): bool
    {
        if ($this->status === self::STATUS_CANCELLED) {
            return false;
        }

        if (isset(self::STATUS_FLOW[$this->status])) {
            return self::STATUS_FLOW[$this->status] === $newStatus;
        }

        return false;
    }

    /**
     * Get the next valid status for this order.
     */
    public function getNextStatus(): ?string
    {
        return self::STATUS_FLOW[$this->status] ?? null;
    }

    /**
     * Check if order is available for pickup.
     */
    public function isAvailableForPickup(): bool
    {
        return $this->status === self::STATUS_PACKED && 
               $this->delivery_partner_id === null;
    }
}
