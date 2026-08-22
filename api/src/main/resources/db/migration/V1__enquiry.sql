-- Enquiry capture for the JUSTEKS corporate site.
--
-- One shared `enquiry` row carries what every form asks for; the type-specific
-- questions live in their own detail tables. That keeps the admin list, the
-- reference numbering and the status flow uniform across all four forms while
-- letting each form ask what it actually needs.

create sequence enquiry_reference_seq;

create table enquiry (
    id            bigserial primary key,
    -- Human-facing identifier, e.g. JTE-2026-00001. Unique so a reference can
    -- never point at two enquiries.
    reference_no  varchar(20)  not null unique,
    type          varchar(32)  not null,
    status        varchar(32)  not null,

    company_name  varchar(200),
    contact_name  varchar(200) not null,
    email         varchar(320) not null,
    phone         varchar(50),
    country       varchar(100) not null,
    city          varchar(100),
    message       text,

    -- Which language the enquiry was submitted in, so a reply goes back in it.
    locale        varchar(8),
    source_ip     varchar(45),
    user_agent    varchar(512),

    created_at    timestamptz  not null default now(),
    updated_at    timestamptz  not null default now()
);

create index enquiry_status_idx     on enquiry (status);
create index enquiry_type_idx       on enquiry (type);
-- The admin list is newest-first, which is the only ordering it offers.
create index enquiry_created_at_idx on enquiry (created_at desc);

create table sourcing_request_detail (
    enquiry_id         bigint primary key references enquiry (id) on delete cascade,
    fabric_type        varchar(200),
    composition        varchar(200),
    gsm                varchar(50),
    width              varchar(50),
    colour             varchar(100),
    application        varchar(200),
    required_quantity  varchar(100),
    delivery_country   varchar(100),
    required_date      date
);

create table bulk_requirement_detail (
    enquiry_id             bigint primary key references enquiry (id) on delete cascade,
    article_or_fabric      varchar(200),
    composition            varchar(200),
    colour                 varchar(100),
    gsm                    varchar(50),
    width                  varchar(50),
    required_quantity      varchar(100),
    required_delivery_date date,
    delivery_country       varchar(100),
    delivery_city          varchar(100),
    production_application varchar(200)
);

create table trade_account_detail (
    enquiry_id             bigint primary key references enquiry (id) on delete cascade,
    company_registration   varchar(100),
    vat_number             varchar(100),
    business_type          varchar(100),
    website                varchar(255),
    annual_volume_estimate varchar(100)
);

create table enquiry_attachment (
    id                bigserial primary key,
    enquiry_id        bigint       not null references enquiry (id) on delete cascade,
    -- What the sender called it, kept for the admin download.
    original_filename varchar(255) not null,
    -- Where we actually put it: a UUID key, never the sender's filename.
    stored_key        varchar(255) not null unique,
    content_type      varchar(128) not null,
    size_bytes        bigint       not null,
    created_at        timestamptz  not null default now()
);

create index enquiry_attachment_enquiry_idx on enquiry_attachment (enquiry_id);

-- GSM, width and quantity are varchar rather than numeric on purpose: buyers
-- write "160-180", "approx 150cm", "2000m / colour". Parsing that into numbers
-- would either reject real enquiries or silently lose what they meant.
