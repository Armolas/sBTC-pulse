(define-constant contract-owner tx-sender)
(define-constant day-length u144) ;; Approx blocks per day on Stacks (~10 min/block)

;; === DATA STRUCTURES ===

(define-map aliases principal (buff 32))
(define-map last-checkins principal uint)
(define-map streaks principal uint)
(define-map rewards principal uint)
(define-map tiers principal uint) ;; 0 = Bronze, 1 = Silver, etc.

;; === ADMIN HELPERS ===

(define-private (is-admin (sender principal))
  (is-eq sender contract-owner))

;; === ALIAS ===

(define-public (register-alias (alias (buff 32)))
  (if (is-eq alias 0x0000000000000000000000000000000000000000000000000000000000000000)
      (err u101) ;; alias cannot be empty
      (begin
        (map-set aliases tx-sender alias)
        (ok true))))

(define-read-only (get-alias (user principal))
  (map-get? aliases user)
)

;; === CHECK-IN & STREAK TRACKING ===

(define-public (check-in)
  (let (
    (now block-height)
    (last-checkin (default-to u0 (map-get? last-checkins tx-sender)))
    (streak (default-to u0 (map-get? streaks tx-sender)))
  )
    (if (<= now last-checkin)
      (err u100) ;; already checked in this block
      (let (
        (days-since (- now last-checkin))
        (new-streak (if (<= days-since day-length)
                       (+ streak u1) ;; continue streak
                       u1))          ;; reset streak
      )
        (begin
          (map-set last-checkins tx-sender now)
          (map-set streaks tx-sender new-streak)
          (ok new-streak)
        )
      )
    )
  )
)

(define-read-only (get-streak (user principal))
  (default-to u0 (map-get? streaks user)))

(define-read-only (get-last-checkin (user principal))
  (default-to u0 (map-get? last-checkins user)))

;; === REWARDS ===

(define-public (update-rewards (user principal) (amount uint))
  (begin
    (if (is-admin tx-sender)
        (let (
          (existing (default-to u0 (map-get? rewards user)))
          (updated (+ existing amount))
        )
          (let ((safe-updated updated))
            (begin
              (begin
                (map-set rewards user safe-updated)
                (ok safe-updated))
            )
          )
        )
        (err u403)))

)

(define-read-only (get-rewards (user principal))
  (default-to u0 (map-get? rewards user)))

;; === TIERS ===

(define-public (assign-tier (user principal) (tier uint))
  (if (is-admin tx-sender)
      (begin
        (map-set tiers user tier)
        (ok true))
      (err u403)))

(define-read-only (get-tier (user principal))
  (default-to u0 (map-get? tiers user)))
