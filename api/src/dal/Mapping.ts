/**
 * mapping settings for the classes
 */
export class Mapping {
    public static classes = JSON.parse(`{ 
        "ProjectTaxSummary": {
            "class": "ProjectTaxSummary"
            , "schema": "FS4"
            , "table": "PROJECT_TAX_SUMMARIES"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "taxation_year": { "name": "taxation_year", "relationship": "none", "columnName": "taxation_year", "dataType": "number", "length": 0 },
                "remarks": { "name": "remarks", "relationship": "none", "columnName": "remarks", "dataType": "string", "length": 0 },
                "document": { "name": "document", "relationship": "none", "columnName": "document", "dataType": "string", "length": 0 },
                "view_count": { "name": "view_count", "relationship": "none", "columnName": "view_count", "dataType": "number", "length": 0 },
                "is_published": { "name": "is_published", "relationship": "none", "columnName": "status", "dataType": "boolean", "length": 0 },
                "xml_generated": { "name": "xml_generated", "relationship": "none", "columnName": "xml_generated", "dataType": "boolean", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 }
                }
            }
        ,"Project": {
            "class": "Project"
            , "schema": "FS4"
            , "table": "PROJECTS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_no": { "name": "project_no", "relationship": "none", "columnName": "project_no", "dataType": "number", "length": 0 },
                "name": { "name": "name", "relationship": "none", "columnName": "name", "dataType": "string", "length": 0 },
                "legal_name": { "name": "legal_name", "relationship": "none", "columnName": "legal_name", "dataType": "string", "length": 0 },
                "short_name": { "name": "short_name", "relationship": "none", "columnName": "short_name", "dataType": "string", "length": 0 },
                "unit_class": { "name": "unit_class", "relationship": "none", "columnName": "unit_class", "dataType": "string", "length": 0 },
                "unit_series": { "name": "unit_series", "relationship": "none", "columnName": "unit_series", "dataType": "string", "length": 0 },
                "seoname": { "name": "seoname", "relationship": "none", "columnName": "seoname", "dataType": "string", "length": 0 },
                "contents": { "name": "contents", "relationship": "none", "columnName": "contents", "dataType": "string", "length": 0 },
                "sponsor_label": { "name": "sponsor_label", "relationship": "none", "columnName": "sponsor_label", "dataType": "boolean", "length": 0 },
                "issuer_id": { "name": "issuer_id", "relationship": "none", "columnName": "issuer_id", "dataType": "number", "length": 0 },
                "project_stage": { "name": "project_stage", "relationship": "none", "columnName": "project_status", "dataType": "ProjectStage", "length": 0 },
                "notification": { "name": "notification", "relationship": "none", "columnName": "notification", "dataType": "boolean", "length": 0 },
                "capital_type": { "name": "capital_type", "relationship": "none", "columnName": "capital_type", "dataType": "ProjectCapitalType", "length": 0 },
                "asset_type": { "name": "asset_type", "relationship": "none", "columnName": "asset_type", "dataType": "ProjectAssetType", "length": 0 },
                "development_type": { "name": "development_type", "relationship": "none", "columnName": "development_type", "dataType": "ProjectDevelopmentType", "length": 0 },
                "sync_to_hubspot": { "name": "sync_to_hubspot", "relationship": "none", "columnName": "sync_to_hubspot", "dataType": "number", "length": 0 },
                "offering_amount": { "name": "offering_amount", "relationship": "none", "columnName": "offering_amount", "dataType": "number", "length": 0 },
                "annual_irr": { "name": "annual_irr", "relationship": "none", "columnName": "annual_irr", "dataType": "string", "length": 0 },
                "loan_to_value_ratio": { "name": "loan_to_value_ratio", "relationship": "none", "columnName": "ltv", "dataType": "string", "length": 0 },
                "matrix_id": { "name": "matrix_id", "relationship": "none", "columnName": "matrix_id", "dataType": "number", "length": 0 },
                "matrix_input": { "name": "matrix_input", "relationship": "none", "columnName": "matrix_input", "dataType": "string", "length": 0 },
                "currency_label": { "name": "currency_label", "relationship": "none", "columnName": "currency_label", "dataType": "CurrencyCode", "length": 0 },
                "total_share": { "name": "total_share", "relationship": "none", "columnName": "total_share", "dataType": "number", "length": 0 },
                "share_price": { "name": "share_price", "relationship": "none", "columnName": "share_price", "dataType": "number", "length": 0 },
                "market_price": { "name": "market_price", "relationship": "none", "columnName": "market_price", "dataType": "number", "length": 0 },
                "sale_price": { "name": "sale_price", "relationship": "none", "columnName": "sale_price", "dataType": "number", "length": 0 },
                "default_share": { "name": "default_share", "relationship": "none", "columnName": "default_share", "dataType": "number", "length": 0 },
                "min_share": { "name": "min_share", "relationship": "none", "columnName": "min_share", "dataType": "number", "length": 0 },
                "max_share": { "name": "max_share", "relationship": "none", "columnName": "max_share", "dataType": "number", "length": 0 },
                "interest_rate": { "name": "interest_rate", "relationship": "none", "columnName": "interest_rate", "dataType": "string", "length": 0 },
                "investment_term": { "name": "investment_term", "relationship": "none", "columnName": "investment_term", "dataType": "string", "length": 0 },
                "minimum_duration_units": { "name": "minimum_duration_units", "relationship": "none", "columnName": "minimum_duration_units", "dataType": "number", "length": 0 },
                "maximum_duration_units": { "name": "maximum_duration_units", "relationship": "none", "columnName": "maximum_duration_units", "dataType": "number", "length": 0 },
                "minimum_duration_type": { "name": "minimum_duration_type", "relationship": "none", "columnName": "minimum_duration_type", "dataType": "DurationType", "length": 0 },
                "maximum_duration_type": { "name": "maximum_duration_type", "relationship": "none", "columnName": "maximum_duration_type", "dataType": "DurationType", "length": 0 },
                "daysleft_flag": { "name": "daysleft_flag", "relationship": "none", "columnName": "daysleft_flag", "dataType": "boolean", "length": 0 },
                "funded_flag": { "name": "funded_flag", "relationship": "none", "columnName": "funded_flag", "dataType": "boolean", "length": 0 },
                "dividend_desc": { "name": "dividend_desc", "relationship": "none", "columnName": "dividend_desc", "dataType": "string", "length": 0 },
                "debt_seniority": { "name": "debt_seniority", "relationship": "none", "columnName": "debt_seniority", "dataType": "DebtSeniorityType", "length": 0 },
                "redeem_ability": { "name": "redeem_ability", "relationship": "none", "columnName": "redeem_ability", "dataType": "string", "length": 0 },
                "investment_eligibility": { "name": "investment_eligibility", "relationship": "none", "columnName": "investment_eligibility", "dataType": "string", "length": 0 },
                "redemption_info": { "name": "redemption_info", "relationship": "none", "columnName": "redemption_info", "dataType": "string", "length": 0 },
                "address": { "name": "address", "relationship": "none", "columnName": "address", "dataType": "string", "length": 0 },
                "zip": { "name": "zip", "relationship": "none", "columnName": "zip", "dataType": "string", "length": 0 },
                "city": { "name": "city", "relationship": "none", "columnName": "city", "dataType": "string", "length": 0 },
                "province_id": { "name": "province_id", "relationship": "none", "columnName": "province_id", "dataType": "number", "length": 0 },
                "country_id": { "name": "country_id", "relationship": "none", "columnName": "country_id", "dataType": "number", "length": 0 },
                "image": { "name": "image", "relationship": "none", "columnName": "image", "dataType": "string", "length": 0 },
                "credit_guarantee": { "name": "credit_guarantee", "relationship": "none", "columnName": "credit_guarantee", "dataType": "string", "length": 0 },
                "issuer_business": { "name": "issuer_business", "relationship": "none", "columnName": "issuer_business", "dataType": "string", "length": 0 },
                "agent_name": { "name": "agent_name", "relationship": "none", "columnName": "agent_name", "dataType": "string", "length": 0 },
                "commission_type": { "name": "commission_type", "relationship": "none", "columnName": "commission_type", "dataType": "CommisionType", "length": 0 },
                "agent_commission": { "name": "agent_commission", "relationship": "none", "columnName": "agent_commission", "dataType": "number", "length": 0 },
                "registrant_contact": { "name": "registrant_contact", "relationship": "none", "columnName": "registrant_contact", "dataType": "string", "length": 0 },
                "use_of_proceeds": { "name": "use_of_proceeds", "relationship": "none", "columnName": "use_of_proceeds", "dataType": "string", "length": 0 },
                "additional_desc": { "name": "additional_desc", "relationship": "none", "columnName": "additional_desc", "dataType": "string", "length": 0 },
                "acknowledgements": { "name": "acknowledgements", "relationship": "none", "columnName": "acknowledgements", "dataType": "string", "length": 0 },
                "long_desc": { "name": "long_desc", "relationship": "none", "columnName": "long_desc", "dataType": "string", "length": 0 },
                "disclaimer_note": { "name": "disclaimer_note", "relationship": "none", "columnName": "disclaimer_note", "dataType": "string", "length": 0 },
                "properties": { "name": "properties", "relationship": "none", "columnName": "properties", "dataType": "string", "length": 0 },
                "tabs": { "name": "tabs", "relationship": "none", "columnName": "tabs", "dataType": "string", "length": 0 },
                "is_private": { "name": "is_private", "relationship": "none", "columnName": "privacy_status", "dataType": "boolean", "length": 0 },
                "private_ids": { "name": "private_ids", "relationship": "none", "columnName": "private_ids", "dataType": "string", "length": 0 },
                "auto_invite": { "name": "auto_invite", "relationship": "none", "columnName": "auto_invite", "dataType": "boolean", "length": 0 },
                "allow_ineligible": { "name": "allow_ineligible", "relationship": "none", "columnName": "allow_ineligible", "dataType": "boolean", "length": 0 },
                "system_status": { "name": "system_status", "relationship": "none", "columnName": "status", "dataType": "ProjectUseStatus", "length": 0 },
                "drip_available": { "name": "drip_available", "relationship": "none", "columnName": "drip_available", "dataType": "boolean", "length": 0 },
                "use_system_om": { "name": "use_system_om", "relationship": "none", "columnName": "use_system_om", "dataType": "boolean", "length": 0 },
                "calc_months_remaining": { "name": "calc_months_remaining", "relationship": "none", "columnName": "calc_months_remaining", "dataType": "boolean", "length": 0 },
                "allow_joint_subscription": { "name": "allow_joint_subscription", "relationship": "none", "columnName": "allow_joint_subscription", "dataType": "boolean", "length": 0 },
                "investments_locked": { "name": "investments_locked", "relationship": "none", "columnName": "investments_locked", "dataType": "boolean", "length": 0 },
                "hide_est_complete_date": { "name": "hide_est_complete_date", "relationship": "none", "columnName": "hide_est_complete_date", "dataType": "boolean", "length": 0 },
                "continuous_offering": { "name": "continuous_offering", "relationship": "none", "columnName": "continuous_offering", "dataType": "boolean", "length": 0 },
                "show_on_home": { "name": "show_on_home", "relationship": "none", "columnName": "home_status", "dataType": "boolean", "length": 0 },
                "over_subscriptions": { "name": "over_subscriptions", "relationship": "none", "columnName": "over_subscriptions", "dataType": "boolean", "length": 0 },
                "exempt_option_id": { "name": "exempt_option_id", "relationship": "none", "columnName": "roed_securitycode", "dataType": "number", "length": 0 },
                "roed_exemption": { "name": "roed_exemption", "relationship": "none", "columnName": "roed_exemption", "dataType": "boolean", "length": 0 },
                "roed_exemption_list": { "name": "roed_exemption_list", "relationship": "none", "columnName": "roed_exemption_list", "dataType": "string", "length": 0 },
                "view_counts": { "name": "view_counts", "relationship": "none", "columnName": "view_counts", "dataType": "number", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "docusign_template_dev_test": { "name": "docusign_template_dev_test", "relationship": "none", "columnName": "docusignTemplate_devTest", "dataType": "string", "length": 0 },
                "docusign_template_production": { "name": "docusign_template_production", "relationship": "none", "columnName": "docusignTemplate_production", "dataType": "string", "length": 0 },
                "docusign_template_merge_rules": { "name": "docusign_template_merge_rules", "relationship": "none", "columnName": "docusignTemplate_mergeRules", "dataType": "string", "length": 0 },
                "docusign_additional_recipients_sending_order": { "name": "docusign_additional_recipients_sending_order", "relationship": "none", "columnName": "docusignAdditionalRecipients_sendingOrder", "dataType": "string", "length": 0 },
                "docusign_additional_recipients_role_name": { "name": "docusign_additional_recipients_role_name", "relationship": "none", "columnName": "docusignAdditionalRecipients_roleName", "dataType": "string", "length": 0 },
                "docusign_additional_recipients_person_name": { "name": "docusign_additional_recipients_person_name", "relationship": "none", "columnName": "docusignAdditionalRecipients_personName", "dataType": "string", "length": 0 },
                "docusign_additional_recipients_person_email": { "name": "docusign_additional_recipients_person_email", "relationship": "none", "columnName": "docusignAdditionalRecipients_personEmail", "dataType": "string", "length": 0 },
                "trust_company_names": { "name": "trust_company_names", "relationship": "none", "columnName": "trust_company_names", "dataType": "string", "length": 0 },
                "funding_start": { "name": "funding_start", "relationship": "none", "columnName": "funding_start", "dataType": "Date", "length": 0 },
                "funding_expiry": { "name": "funding_expiry", "relationship": "none", "columnName": "funding_expiry", "dataType": "Date", "length": 0 },
                "maturity_date": { "name": "maturity_date", "relationship": "none", "columnName": "maturity_date", "dataType": "Date", "length": 0 },
                "hubspot_id": { "name": "hubspot_id", "relationship": "none", "columnName": "hubspot_id", "dataType": "string", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "events_project": { "name": "events_project", "relationship": "in", "columnName": "project_id", "dataType": "Event[]", "length": 0 },
                "ffba_association_to_project": { "name": "ffba_association_to_project", "relationship": "in", "columnName": "project_id", "dataType": "FfbaAssociation[]", "length": 0 },
                "orders": { "name": "orders", "relationship": "in", "columnName": "project_id", "dataType": "InvestmentOrder[]", "length": 0 },
                "transactions": { "name": "transactions", "relationship": "in", "columnName": "project_id", "dataType": "InvestmentTransaction[]", "length": 0 },
                "watches": { "name": "watches", "relationship": "in", "columnName": "project_id", "dataType": "InvestmentWatchlist[]", "length": 0 },
                "investor_earnings": { "name": "investor_earnings", "relationship": "in", "columnName": "project_id", "dataType": "InvestorEarning[]", "length": 0 },
                "accounts": { "name": "accounts", "relationship": "in", "columnName": "project_id", "dataType": "ProjectAccount[]", "length": 0 },
                "project_docusign_mappings_project_id_docusign_mappings": { "name": "project_docusign_mappings_project_id_docusign_mappings", "relationship": "in", "columnName": "project_applied_to_id", "dataType": "ProjectDocusignMapping[]", "length": 0 },
                "adjustments": { "name": "adjustments", "relationship": "in", "columnName": "project_id", "dataType": "ProjectBalanceAdjustment[]", "length": 0 },
                "entities": { "name": "entities", "relationship": "in", "columnName": "project_id", "dataType": "ProjectEntity[]", "length": 0 },
                "images": { "name": "images", "relationship": "in", "columnName": "project_id", "dataType": "ProjectImage[]", "length": 0 },
                "backers": { "name": "backers", "relationship": "in", "columnName": "project_id", "dataType": "ProjectKeybacker[]", "length": 0 },
                "pdfs": { "name": "pdfs", "relationship": "in", "columnName": "project_id", "dataType": "ProjectPdf[]", "length": 0 },
                "status_reports": { "name": "status_reports", "relationship": "in", "columnName": "project_id", "dataType": "ProjectStatusReport[]", "length": 0 },
                "tax_reports": { "name": "tax_reports", "relationship": "in", "columnName": "project_id", "dataType": "ProjectTaxReport[]", "length": 0 },
                "tax_summaries": { "name": "tax_summaries", "relationship": "in", "columnName": "project_id", "dataType": "ProjectTaxSummary[]", "length": 0 },
                "country": { "name": "country", "relationship": "out", "columnName": "country_id", "dataType": "Country", "length": 0 },
                "issuer": { "name": "issuer", "relationship": "out", "columnName": "issuer_id", "dataType": "UserSocialProfile", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "province": { "name": "province", "relationship": "out", "columnName": "province_id", "dataType": "Province", "length": 0 },
                "exempt_option": { "name": "exempt_option", "relationship": "out", "columnName": "roed_securitycode", "dataType": "ExemptDistributionOption", "length": 0 },
                "roed_schedule1_s_to_projects": { "name": "roed_schedule1_s_to_projects", "relationship": "in", "columnName": "project_id", "dataType": "RoedSchedule1[]", "length": 0 },
                "users_socialprofile_project_id_profiles": { "name": "users_socialprofile_project_id_profiles", "relationship": "in", "columnName": "project_id", "dataType": "UserSocialProfile[]", "length": 0 },
                "web_hooks_project": { "name": "web_hooks_project", "relationship": "in", "columnName": "project_id", "dataType": "WebHook[]", "length": 0 }
                }
            }
        ,"ProjectInterest": {
            "class": "ProjectInterest"
            , "schema": "FS4"
            , "table": "PROPERTY_INTEREST"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "interest_by_id": { "name": "interest_by_id", "relationship": "none", "columnName": "interest_by_id", "dataType": "number", "length": 0 },
                "interest_in_id": { "name": "interest_in_id", "relationship": "none", "columnName": "interest_in_id", "dataType": "number", "length": 0 },
                "amount_to_invest": { "name": "amount_to_invest", "relationship": "none", "columnName": "amount_to_invest", "dataType": "number", "length": 0 },
                "time_until_investment": { "name": "time_until_investment", "relationship": "none", "columnName": "time_until_investment", "dataType": "string", "length": 0 },
                "remarks": { "name": "remarks", "relationship": "none", "columnName": "remarks", "dataType": "string", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "interest_by": { "name": "interest_by", "relationship": "out", "columnName": "interest_by_id", "dataType": "UserSocialProfile", "length": 0 },
                "interest_in": { "name": "interest_in", "relationship": "out", "columnName": "interest_in_id", "dataType": "UserSocialProfile", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"Province": {
            "class": "Province"
            , "schema": "FS4"
            , "table": "PROVINCES"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "name": { "name": "name", "relationship": "none", "columnName": "name", "dataType": "string", "length": 0 },
                "country_id": { "name": "country_id", "relationship": "none", "columnName": "country_id", "dataType": "number", "length": 0 },
                "code": { "name": "code", "relationship": "none", "columnName": "code", "dataType": "string", "length": 0 },
                "latitude": { "name": "latitude", "relationship": "none", "columnName": "latitude", "dataType": "number", "length": 0 },
                "longitude": { "name": "longitude", "relationship": "none", "columnName": "longitude", "dataType": "number", "length": 0 },
                "timezone": { "name": "timezone", "relationship": "none", "columnName": "timezone", "dataType": "string", "length": 0 },
                "visible": { "name": "visible", "relationship": "none", "columnName": "visible", "dataType": "boolean", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "all_users_to_mprovinces": { "name": "all_users_to_mprovinces", "relationship": "in", "columnName": "mailing_province_id", "dataType": "AllUser[]", "length": 0 },
                "all_users_to_province": { "name": "all_users_to_province", "relationship": "in", "columnName": "province_id", "dataType": "AllUser[]", "length": 0 },
                "investment_withdrawal_to_province": { "name": "investment_withdrawal_to_province", "relationship": "in", "columnName": "bank_province_id", "dataType": "InvestmentWithdrawal[]", "length": 0 },
                "projects": { "name": "projects", "relationship": "in", "columnName": "province_id", "dataType": "Project[]", "length": 0 },
                "country": { "name": "country", "relationship": "out", "columnName": "country_id", "dataType": "Country", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "investor_companies": { "name": "investor_companies", "relationship": "in", "columnName": "company_province_id", "dataType": "UserEntity[]", "length": 0 },
                "users_socialprofile_jurisdiction_id_profiles": { "name": "users_socialprofile_jurisdiction_id_profiles", "relationship": "in", "columnName": "jurisdiction_id", "dataType": "UserSocialProfile[]", "length": 0 },
                "users_socialprofile_province_id": { "name": "users_socialprofile_province_id", "relationship": "in", "columnName": "province_id", "dataType": "UserSocialProfile[]", "length": 0 },
                "users_socialprofile_statute_id_to_provinces": { "name": "users_socialprofile_statute_id_to_provinces", "relationship": "in", "columnName": "statute_id", "dataType": "UserSocialProfile[]", "length": 0 }
                }
            }
        ,"RegistrationQuestion": {
            "class": "RegistrationQuestion"
            , "schema": "FS4"
            , "table": "REGISTRATION_QUESTIONARY"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "category": { "name": "category", "relationship": "none", "columnName": "type", "dataType": "RegistrationQuestionCategory", "length": 0 },
                "question": { "name": "question", "relationship": "none", "columnName": "question", "dataType": "string", "length": 0 },
                "wellknown": { "name": "wellknown", "relationship": "none", "columnName": "wellknown", "dataType": "string", "length": 0 },
                "content": { "name": "content", "relationship": "none", "columnName": "content", "dataType": "string", "length": 0 },
                "question_set": { "name": "question_set", "relationship": "none", "columnName": "question_set", "dataType": "number", "length": 0 },
                "representative_image": { "name": "representative_image", "relationship": "none", "columnName": "representative_image", "dataType": "string", "length": 0 },
                "answer_type": { "name": "answer_type", "relationship": "none", "columnName": "answer_type", "dataType": "QuestionAnswerType", "length": 0 },
                "type_3_range": { "name": "type_3_range", "relationship": "none", "columnName": "type_3_range", "dataType": "string", "length": 0 },
                "type_3_total": { "name": "type_3_total", "relationship": "none", "columnName": "type_3_total", "dataType": "number", "length": 0 },
                "slider_display": { "name": "slider_display", "relationship": "none", "columnName": "slider_display", "dataType": "boolean", "length": 0 },
                "answer_choice_1": { "name": "answer_choice_1", "relationship": "none", "columnName": "answer_choice_1", "dataType": "string", "length": 0 },
                "answer1_image": { "name": "answer1_image", "relationship": "none", "columnName": "answer1_image", "dataType": "string", "length": 0 },
                "answer_choice_2": { "name": "answer_choice_2", "relationship": "none", "columnName": "answer_choice_2", "dataType": "string", "length": 0 },
                "answer2_image": { "name": "answer2_image", "relationship": "none", "columnName": "answer2_image", "dataType": "string", "length": 0 },
                "answer_choice_3": { "name": "answer_choice_3", "relationship": "none", "columnName": "answer_choice_3", "dataType": "string", "length": 0 },
                "answer3_image": { "name": "answer3_image", "relationship": "none", "columnName": "answer3_image", "dataType": "string", "length": 0 },
                "answer_choice_4": { "name": "answer_choice_4", "relationship": "none", "columnName": "answer_choice_4", "dataType": "string", "length": 0 },
                "answer4_image": { "name": "answer4_image", "relationship": "none", "columnName": "answer4_image", "dataType": "string", "length": 0 },
                "answer_choice_5": { "name": "answer_choice_5", "relationship": "none", "columnName": "answer_choice_5", "dataType": "string", "length": 0 },
                "answer5_image": { "name": "answer5_image", "relationship": "none", "columnName": "answer5_image", "dataType": "string", "length": 0 },
                "answer_choice_6": { "name": "answer_choice_6", "relationship": "none", "columnName": "answer_choice_6", "dataType": "string", "length": 0 },
                "answer6_image": { "name": "answer6_image", "relationship": "none", "columnName": "answer6_image", "dataType": "string", "length": 0 },
                "answer_choice_7": { "name": "answer_choice_7", "relationship": "none", "columnName": "answer_choice_7", "dataType": "string", "length": 0 },
                "answer7_image": { "name": "answer7_image", "relationship": "none", "columnName": "answer7_image", "dataType": "string", "length": 0 },
                "answer_choice_8": { "name": "answer_choice_8", "relationship": "none", "columnName": "answer_choice_8", "dataType": "string", "length": 0 },
                "answer8_image": { "name": "answer8_image", "relationship": "none", "columnName": "answer8_image", "dataType": "string", "length": 0 },
                "answer_choice_9": { "name": "answer_choice_9", "relationship": "none", "columnName": "answer_choice_9", "dataType": "string", "length": 0 },
                "answer9_image": { "name": "answer9_image", "relationship": "none", "columnName": "answer9_image", "dataType": "string", "length": 0 },
                "answer_choice_10": { "name": "answer_choice_10", "relationship": "none", "columnName": "answer_choice_10", "dataType": "string", "length": 0 },
                "answer10_image": { "name": "answer10_image", "relationship": "none", "columnName": "answer10_image", "dataType": "string", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "visible": { "name": "visible", "relationship": "none", "columnName": "visible", "dataType": "boolean", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "answers": { "name": "answers", "relationship": "in", "columnName": "question_id", "dataType": "UserAnswer[]", "length": 0 }
                }
            }
        ,"RoedSchedule1": {
            "class": "RoedSchedule1"
            , "schema": "FS4"
            , "table": "ROED_SCHEDULE1S"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "name": { "name": "name", "relationship": "none", "columnName": "name", "dataType": "string", "length": 0 },
                "remarks": { "name": "remarks", "relationship": "none", "columnName": "remarks", "dataType": "string", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "document": { "name": "document", "relationship": "none", "columnName": "document", "dataType": "string", "length": 0 },
                "filed_rows_to_ignore": { "name": "filed_rows_to_ignore", "relationship": "none", "columnName": "filed_rows_to_ignore", "dataType": "string", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "RoedSchedule1State", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "orders": { "name": "orders", "relationship": "in", "columnName": "roed_schedule1_id", "dataType": "InvestmentOrder[]", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 }
                }
            }
        ,"Setting": {
            "class": "Setting"
            , "schema": "FS4"
            , "table": "SETTINGS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "company": { "name": "company", "relationship": "none", "columnName": "company", "dataType": "string", "length": 0 },
                "address": { "name": "address", "relationship": "none", "columnName": "address", "dataType": "string", "length": 0 },
                "address2": { "name": "address2", "relationship": "none", "columnName": "address2", "dataType": "string", "length": 0 },
                "city": { "name": "city", "relationship": "none", "columnName": "city", "dataType": "string", "length": 0 },
                "zip": { "name": "zip", "relationship": "none", "columnName": "zip", "dataType": "string", "length": 0 },
                "province": { "name": "province", "relationship": "none", "columnName": "province", "dataType": "string", "length": 0 },
                "country": { "name": "country", "relationship": "none", "columnName": "country", "dataType": "string", "length": 0 },
                "site_name": { "name": "site_name", "relationship": "none", "columnName": "site_name", "dataType": "string", "length": 0 },
                "site_domain": { "name": "site_domain", "relationship": "none", "columnName": "site_domain", "dataType": "string", "length": 0 },
                "phone": { "name": "phone", "relationship": "none", "columnName": "phone", "dataType": "string", "length": 0 },
                "phone2": { "name": "phone2", "relationship": "none", "columnName": "phone2", "dataType": "string", "length": 0 },
                "fax": { "name": "fax", "relationship": "none", "columnName": "fax", "dataType": "string", "length": 0 },
                "info_email": { "name": "info_email", "relationship": "none", "columnName": "info_email", "dataType": "string", "length": 0 },
                "petoes": { "name": "petoes", "relationship": "none", "columnName": "petoes", "dataType": "string", "length": 0 },
                "title": { "name": "title", "relationship": "none", "columnName": "title", "dataType": "string", "length": 0 },
                "keywords": { "name": "keywords", "relationship": "none", "columnName": "keywords", "dataType": "string", "length": 0 },
                "description": { "name": "description", "relationship": "none", "columnName": "description", "dataType": "string", "length": 0 },
                "facebook": { "name": "facebook", "relationship": "none", "columnName": "facebook", "dataType": "string", "length": 0 },
                "twitter": { "name": "twitter", "relationship": "none", "columnName": "twitter", "dataType": "string", "length": 0 },
                "google": { "name": "google", "relationship": "none", "columnName": "google", "dataType": "string", "length": 0 },
                "pinterest": { "name": "pinterest", "relationship": "none", "columnName": "pinterest", "dataType": "string", "length": 0 },
                "linkedin": { "name": "linkedin", "relationship": "none", "columnName": "linkedin", "dataType": "string", "length": 0 },
                "instagram": { "name": "instagram", "relationship": "none", "columnName": "instagram", "dataType": "string", "length": 0 },
                "tumblr": { "name": "tumblr", "relationship": "none", "columnName": "tumblr", "dataType": "string", "length": 0 },
                "youtube": { "name": "youtube", "relationship": "none", "columnName": "youtube", "dataType": "string", "length": 0 },
                "blog": { "name": "blog", "relationship": "none", "columnName": "blog", "dataType": "string", "length": 0 },
                "relationship_disclosure": { "name": "relationship_disclosure", "relationship": "none", "columnName": "relationship_disclosure", "dataType": "string", "length": 0 },
                "google_analytics": { "name": "google_analytics", "relationship": "none", "columnName": "google_analytics", "dataType": "string", "length": 0 },
                "google_analytics_body": { "name": "google_analytics_body", "relationship": "none", "columnName": "google_analytics_body", "dataType": "string", "length": 0 },
                "dev_company": { "name": "dev_company", "relationship": "none", "columnName": "dev_company", "dataType": "string", "length": 0 },
                "dev_address": { "name": "dev_address", "relationship": "none", "columnName": "dev_address", "dataType": "string", "length": 0 },
                "dev_address2": { "name": "dev_address2", "relationship": "none", "columnName": "dev_address2", "dataType": "string", "length": 0 },
                "dev_city": { "name": "dev_city", "relationship": "none", "columnName": "dev_city", "dataType": "string", "length": 0 },
                "dev_zip": { "name": "dev_zip", "relationship": "none", "columnName": "dev_zip", "dataType": "string", "length": 0 },
                "dev_province": { "name": "dev_province", "relationship": "none", "columnName": "dev_province", "dataType": "string", "length": 0 },
                "dev_country": { "name": "dev_country", "relationship": "none", "columnName": "dev_country", "dataType": "string", "length": 0 },
                "dev_phone": { "name": "dev_phone", "relationship": "none", "columnName": "dev_phone", "dataType": "string", "length": 0 },
                "dev_fax": { "name": "dev_fax", "relationship": "none", "columnName": "dev_fax", "dataType": "string", "length": 0 },
                "dev_email": { "name": "dev_email", "relationship": "none", "columnName": "dev_email", "dataType": "string", "length": 0 },
                "dev_web": { "name": "dev_web", "relationship": "none", "columnName": "dev_web", "dataType": "string", "length": 0 },
                "timezone": { "name": "timezone", "relationship": "none", "columnName": "timezone", "dataType": "string", "length": 0 },
                "use_openssl": { "name": "use_openssl", "relationship": "none", "columnName": "use_openssl", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"SupportEngineer": {
            "class": "SupportEngineer"
            , "schema": "FS4"
            , "table": "SUPPORT_ENGINEERS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "first_name": { "name": "first_name", "relationship": "none", "columnName": "first_name", "dataType": "string", "length": 0 },
                "last_name": { "name": "last_name", "relationship": "none", "columnName": "last_name", "dataType": "string", "length": 0 },
                "title": { "name": "title", "relationship": "none", "columnName": "title", "dataType": "string", "length": 0 },
                "phone": { "name": "phone", "relationship": "none", "columnName": "phone", "dataType": "string", "length": 0 },
                "email": { "name": "email", "relationship": "none", "columnName": "email", "dataType": "string", "length": 0 },
                "image": { "name": "image", "relationship": "none", "columnName": "image", "dataType": "string", "length": 0 },
                "content": { "name": "content", "relationship": "none", "columnName": "content", "dataType": "string", "length": 0 },
                "profile_cap": { "name": "profile_cap", "relationship": "none", "columnName": "profile_cap", "dataType": "number", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "visible": { "name": "visible", "relationship": "none", "columnName": "visible", "dataType": "boolean", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"UserIssuerAssociation": {
            "class": "UserIssuerAssociation"
            , "schema": "FS4"
            , "table": "USER_ISSUER_ASSOCIATIONS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "issuer_id": { "name": "issuer_id", "relationship": "none", "columnName": "issuer_id", "dataType": "number", "length": 0 },
                "association_type": { "name": "association_type", "relationship": "none", "columnName": "association_type", "dataType": "UserIssuerAssociationType", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "issuer": { "name": "issuer", "relationship": "out", "columnName": "issuer_id", "dataType": "UserSocialProfile", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"UserRelationship": {
            "class": "UserRelationship"
            , "schema": "FS4"
            , "table": "USER_RELATIONSHIP"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_1_id": { "name": "user_1_id", "relationship": "none", "columnName": "user_id_1", "dataType": "number", "length": 0 },
                "user_2_id": { "name": "user_2_id", "relationship": "none", "columnName": "user_id_2", "dataType": "number", "length": 0 },
                "relationship_type": { "name": "relationship_type", "relationship": "none", "columnName": "relationship_type", "dataType": "UserRelationshipType", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "user_1": { "name": "user_1", "relationship": "out", "columnName": "user_id_1", "dataType": "AllUser", "length": 0 },
                "user_2": { "name": "user_2", "relationship": "out", "columnName": "user_id_2", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"UserBankingDetails": {
            "class": "UserBankingDetails"
            , "schema": "FS4"
            , "table": "USERS_BANKING_DETAILS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "user_entity_id": { "name": "user_entity_id", "relationship": "none", "columnName": "user_entity_id", "dataType": "number", "length": 0 },
                "joint_subscriber_id": { "name": "joint_subscriber_id", "relationship": "none", "columnName": "joint_subscriber_id", "dataType": "number", "length": 0 },
                "beneficiary_name": { "name": "beneficiary_name", "relationship": "none", "columnName": "beneficiary_name", "dataType": "string", "length": 0 },
                "encrypted_data": { "name": "encrypted_data", "relationship": "none", "columnName": "encrypted_data", "dataType": "string", "length": 0 },
                "stored_offline": { "name": "stored_offline", "relationship": "none", "columnName": "stored_offline", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "joint_subscriber": { "name": "joint_subscriber", "relationship": "out", "columnName": "joint_subscriber_id", "dataType": "AllUser", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "user_entity": { "name": "user_entity", "relationship": "out", "columnName": "user_entity_id", "dataType": "UserEntity", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"UserFinancialKyc": {
            "class": "UserFinancialKyc"
            , "schema": "FS4"
            , "table": "USERS_EMPLOYMENT"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "employment_status": { "name": "employment_status", "relationship": "none", "columnName": "employment_status", "dataType": "string", "length": 0 },
                "employer": { "name": "employer", "relationship": "none", "columnName": "employer", "dataType": "string", "length": 0 },
                "industry": { "name": "industry", "relationship": "none", "columnName": "industry", "dataType": "string", "length": 0 },
                "position": { "name": "position", "relationship": "none", "columnName": "position", "dataType": "string", "length": 0 },
                "years": { "name": "years", "relationship": "none", "columnName": "years", "dataType": "string", "length": 0 },
                "income_includes_partner": { "name": "income_includes_partner", "relationship": "none", "columnName": "income_includes_partner", "dataType": "string", "length": 0 },
                "year_entered": { "name": "year_entered", "relationship": "none", "columnName": "year_entered", "dataType": "number", "length": 0 },
                "income_current_year": { "name": "income_current_year", "relationship": "none", "columnName": "income_current_year", "dataType": "FinancialRange", "length": 0 },
                "income_previous_year": { "name": "income_previous_year", "relationship": "none", "columnName": "income_previous_year", "dataType": "FinancialRange", "length": 0 },
                "income_two_years_ago": { "name": "income_two_years_ago", "relationship": "none", "columnName": "income_two_years_ago", "dataType": "FinancialRange", "length": 0 },
                "net_financial_assest_range": { "name": "net_financial_assest_range", "relationship": "none", "columnName": "net_financial_assest_range", "dataType": "FinancialRange", "length": 0 },
                "advisor_dealer": { "name": "advisor_dealer", "relationship": "none", "columnName": "advisor_dealer", "dataType": "string", "length": 0 },
                "represents_advisor_dealer": { "name": "represents_advisor_dealer", "relationship": "none", "columnName": "represents_advisor_dealer", "dataType": "string", "length": 0 },
                "acting_on_account_for_advisor_dealer": { "name": "acting_on_account_for_advisor_dealer", "relationship": "none", "columnName": "acting_on_account_for_advisor_dealer", "dataType": "string", "length": 0 },
                "net_assets_range": { "name": "net_assets_range", "relationship": "none", "columnName": "net_assets_range", "dataType": "FinancialRange", "length": 0 },
                "income_curr_new": { "name": "income_curr_new", "relationship": "none", "columnName": "income_curr_new", "dataType": "number", "length": 0 },
                "income_curr1_new": { "name": "income_curr1_new", "relationship": "none", "columnName": "income_curr1_new", "dataType": "number", "length": 0 },
                "income_curr2_new": { "name": "income_curr2_new", "relationship": "none", "columnName": "income_curr2_new", "dataType": "number", "length": 0 },
                "income_net_new": { "name": "income_net_new", "relationship": "none", "columnName": "income_net_new", "dataType": "number", "length": 0 },
                "assets_net_new": { "name": "assets_net_new", "relationship": "none", "columnName": "assets_net_new", "dataType": "number", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"UserEntity": {
            "class": "UserEntity"
            , "schema": "FS4"
            , "table": "USERS_ENTITY"
            , "defaultOrderBy": "id"
            , "discriminator_column": "TYPE"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "type": { "name": "type", "relationship": "none", "columnName": "type", "dataType": "EntityType", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "client_number": { "name": "client_number", "relationship": "none", "columnName": "client_number", "dataType": "string", "length": 0 },
                "name": { "name": "name", "relationship": "none", "columnName": "name", "dataType": "string", "length": 0 },
                "address": { "name": "address", "relationship": "none", "columnName": "address", "dataType": "string", "length": 0 },
                "address2": { "name": "address2", "relationship": "none", "columnName": "address2", "dataType": "string", "length": 0 },
                "apt_number": { "name": "apt_number", "relationship": "none", "columnName": "apt_number", "dataType": "string", "length": 0 },
                "country_id": { "name": "country_id", "relationship": "none", "columnName": "country_id", "dataType": "number", "length": 0 },
                "province_id": { "name": "province_id", "relationship": "none", "columnName": "province_id", "dataType": "number", "length": 0 },
                "zip": { "name": "zip", "relationship": "none", "columnName": "zip", "dataType": "string", "length": 0 },
                "city": { "name": "city", "relationship": "none", "columnName": "city", "dataType": "string", "length": 0 },
                "pdf_file": { "name": "pdf_file", "relationship": "none", "columnName": "pdf_file", "dataType": "string", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "UserEntityStatus", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "ffba_association_to_user_entity": { "name": "ffba_association_to_user_entity", "relationship": "in", "columnName": "entity_id", "dataType": "FfbaAssociation[]", "length": 0 },
                "earnings": { "name": "earnings", "relationship": "in", "columnName": "user_entity_id", "dataType": "InvestorEarning[]", "length": 0 },
                "users_banking_details_to_user_entity": { "name": "users_banking_details_to_user_entity", "relationship": "in", "columnName": "user_entity_id", "dataType": "UserBankingDetails[]", "length": 0 },
                "company_province": { "name": "company_province", "relationship": "out", "columnName": "company_province_id", "dataType": "Province", "length": 0 },
                "country": { "name": "country", "relationship": "out", "columnName": "country_id", "dataType": "Country", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "province": { "name": "province", "relationship": "out", "columnName": "province_id", "dataType": "Province", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 },
                "users_questionary_entity_answers": { "name": "users_questionary_entity_answers", "relationship": "in", "columnName": "entity_id", "dataType": "UserAnswer[]", "length": 0 }
                }
            }
        ,"AllUser": {
            "class": "AllUser"
            , "schema": "FS4"
            , "table": "ALL_USERS"
            , "defaultOrderBy": "id"
            , "discriminator_column": "USER_TYPE"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_type": { "name": "user_type", "relationship": "none", "columnName": "user_type", "dataType": "UserType", "length": 0 },
                "first_name": { "name": "first_name", "relationship": "none", "columnName": "first_name", "dataType": "string", "length": 0 },
                "last_name": { "name": "last_name", "relationship": "none", "columnName": "last_name", "dataType": "string", "length": 0 },
                "avatar_image_file_name": { "name": "avatar_image_file_name", "relationship": "none", "columnName": "image_file_name", "dataType": "string", "length": 0 },
                "email": { "name": "email", "relationship": "none", "columnName": "email", "dataType": "string", "length": 0 },
                "last_login": { "name": "last_login", "relationship": "none", "columnName": "last_login", "dataType": "Date", "length": 0 },
                "last_ip": { "name": "last_ip", "relationship": "none", "columnName": "last_ip", "dataType": "string", "length": 0 },
                "identity_provider": { "name": "identity_provider", "relationship": "none", "columnName": "identity_provider", "dataType": "string", "length": 0 },
                "user_principle_name": { "name": "user_principle_name", "relationship": "none", "columnName": "user_principle_name", "dataType": "string", "length": 0 },
                "preferences_as_json": { "name": "preferences_as_json", "relationship": "none", "columnName": "preferences_as_json", "dataType": "string", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "cobranded_client_of": { "name": "cobranded_client_of", "relationship": "out", "columnName": "cobranded_client_of_id", "dataType": "UserSocialProfile", "length": 0 },
                "country": { "name": "country", "relationship": "out", "columnName": "country_id", "dataType": "Country", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "changes": { "name": "changes", "relationship": "in", "columnName": "last_changed_by_id", "dataType": "WebHook[]", "length": 0 },
                "mailing_country": { "name": "mailing_country", "relationship": "out", "columnName": "mailing_country_id", "dataType": "Country", "length": 0 },
                "mailing_province": { "name": "mailing_province", "relationship": "out", "columnName": "mailing_province_id", "dataType": "Province", "length": 0 },
                "province": { "name": "province", "relationship": "out", "columnName": "province_id", "dataType": "Province", "length": 0 },
                "background_processs_lastuser_last_changed_by_id_changes": { "name": "background_processs_lastuser_last_changed_by_id_changes", "relationship": "in", "columnName": "last_changed_by_id", "dataType": "BackgroundProcess[]", "length": 0 },
                "events_to_user": { "name": "events_to_user", "relationship": "in", "columnName": "user_id", "dataType": "Event[]", "length": 0 },
                "ffba_association_to_user": { "name": "ffba_association_to_user", "relationship": "in", "columnName": "user_id", "dataType": "FfbaAssociation[]", "length": 0 },
                "contacts": { "name": "contacts", "relationship": "in", "columnName": "user_id", "dataType": "ImportedContact[]", "length": 0 },
                "investment_orders_joint_subscriber_to_user": { "name": "investment_orders_joint_subscriber_to_user", "relationship": "in", "columnName": "joint_subscriber_id", "dataType": "InvestmentOrder[]", "length": 0 },
                "orders": { "name": "orders", "relationship": "in", "columnName": "user_id", "dataType": "InvestmentOrder[]", "length": 0 },
                "transactions": { "name": "transactions", "relationship": "in", "columnName": "user_id", "dataType": "InvestmentTransaction[]", "length": 0 },
                "watches": { "name": "watches", "relationship": "in", "columnName": "user_id", "dataType": "InvestmentWatchlist[]", "length": 0 },
                "investor_ack_orders_user_order_acknowledgements": { "name": "investor_ack_orders_user_order_acknowledgements", "relationship": "in", "columnName": "user_id", "dataType": "OrderAcknowledgement[]", "length": 0 },
                "investor_earnings_user_d": { "name": "investor_earnings_user_d", "relationship": "in", "columnName": "user_id", "dataType": "InvestorEarning[]", "length": 0 },
                "intended_trades": { "name": "intended_trades", "relationship": "in", "columnName": "user_id", "dataType": "InvestorIntendedTrades[]", "length": 0 },
                "sent_emails": { "name": "sent_emails", "relationship": "in", "columnName": "from_id", "dataType": "Mail[]", "length": 0 },
                "received_emails": { "name": "received_emails", "relationship": "in", "columnName": "to_id", "dataType": "Mail[]", "length": 0 },
                "accessible_modules": { "name": "accessible_modules", "relationship": "in", "columnName": "user_id", "dataType": "ModuleAccess[]", "length": 0 },
                "tax_reports": { "name": "tax_reports", "relationship": "in", "columnName": "user_id", "dataType": "ProjectTaxReport[]", "length": 0 },
                "owner_user": { "name": "owner_user", "relationship": "in", "columnName": "user_id", "dataType": "SupportEngineer[]", "length": 0 },
                "user_issuer_associations_to_user_id_issuer_associations": { "name": "user_issuer_associations_to_user_id_issuer_associations", "relationship": "in", "columnName": "user_id", "dataType": "UserIssuerAssociation[]", "length": 0 },
                "user_relationship_to_user_1": { "name": "user_relationship_to_user_1", "relationship": "in", "columnName": "user_id_1", "dataType": "UserRelationship[]", "length": 0 },
                "user_relationship_to_user_2": { "name": "user_relationship_to_user_2", "relationship": "in", "columnName": "user_id_2", "dataType": "UserRelationship[]", "length": 0 },
                "users_banking_details_to_joint_user": { "name": "users_banking_details_to_joint_user", "relationship": "in", "columnName": "joint_subscriber_id", "dataType": "UserBankingDetails[]", "length": 0 },
                "users_banking_details_to_user": { "name": "users_banking_details_to_user", "relationship": "in", "columnName": "user_id", "dataType": "UserBankingDetails[]", "length": 0 },
                "financial_kyc": { "name": "financial_kyc", "relationship": "in", "columnName": "user_id", "dataType": "UserFinancialKyc[]", "length": 0 },
                "entities": { "name": "entities", "relationship": "in", "columnName": "user_id", "dataType": "UserEntity[]", "length": 0 },
                "invitations": { "name": "invitations", "relationship": "in", "columnName": "user_id", "dataType": "UserInvitation[]", "length": 0 },
                "pdfs": { "name": "pdfs", "relationship": "in", "columnName": "user_id", "dataType": "UserPdf[]", "length": 0 },
                "answers": { "name": "answers", "relationship": "in", "columnName": "user_id", "dataType": "UserAnswer[]", "length": 0 },
                "requests": { "name": "requests", "relationship": "in", "columnName": "user_id", "dataType": "UserRequest[]", "length": 0 },
                "users_socialprofile_last_changed_by_id_changes": { "name": "users_socialprofile_last_changed_by_id_changes", "relationship": "in", "columnName": "last_changed_by_id", "dataType": "UserSocialProfile[]", "length": 0 },
                "users_socialprofile_user_id_profiles": { "name": "users_socialprofile_user_id_profiles", "relationship": "in", "columnName": "user_id", "dataType": "UserSocialProfile[]", "length": 0 },
                "subscriptions": { "name": "subscriptions", "relationship": "in", "columnName": "user_id", "dataType": "UserSubscription[]", "length": 0 },
                "web_hooks_to_user": { "name": "web_hooks_to_user", "relationship": "in", "columnName": "user_id", "dataType": "WebHook[]", "length": 0 }
                }
            }
        ,"UserInvitation": {
            "class": "UserInvitation"
            , "schema": "FS4"
            , "table": "USERS_INVITEE"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "first_name": { "name": "first_name", "relationship": "none", "columnName": "first_name", "dataType": "string", "length": 0 },
                "last_name": { "name": "last_name", "relationship": "none", "columnName": "last_name", "dataType": "string", "length": 0 },
                "email": { "name": "email", "relationship": "none", "columnName": "email", "dataType": "string", "length": 0 },
                "message": { "name": "message", "relationship": "none", "columnName": "message", "dataType": "string", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"BackgroundProcess": {
            "class": "BackgroundProcess"
            , "schema": "FS4"
            , "table": "BACKGROUND_PROCESS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "cmd_line": { "name": "cmd_line", "relationship": "none", "columnName": "cmd_line", "dataType": "string", "length": 0 },
                "started_at": { "name": "started_at", "relationship": "none", "columnName": "started_at", "dataType": "Date", "length": 0 },
                "finished_at": { "name": "finished_at", "relationship": "none", "columnName": "finished_at", "dataType": "Date", "length": 0 },
                "succeeded": { "name": "succeeded", "relationship": "none", "columnName": "succeeded", "dataType": "boolean", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"UserPdf": {
            "class": "UserPdf"
            , "schema": "FS4"
            , "table": "USERS_PDF"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "order_id": { "name": "order_id", "relationship": "none", "columnName": "order_id", "dataType": "number", "length": 0 },
                "pdf_type": { "name": "pdf_type", "relationship": "none", "columnName": "pdf_type", "dataType": "UserPdfType", "length": 0 },
                "pdf_name": { "name": "pdf_name", "relationship": "none", "columnName": "pdf_name", "dataType": "string", "length": 0 },
                "exel_name": { "name": "exel_name", "relationship": "none", "columnName": "exel_name", "dataType": "string", "length": 0 },
                "relevant_month": { "name": "relevant_month", "relationship": "none", "columnName": "relevant_month", "dataType": "number", "length": 0 },
                "relevant_year": { "name": "relevant_year", "relationship": "none", "columnName": "relevant_year", "dataType": "number", "length": 0 },
                "remarks": { "name": "remarks", "relationship": "none", "columnName": "remarks", "dataType": "string", "length": 0 },
                "effective_date": { "name": "effective_date", "relationship": "none", "columnName": "effective_date", "dataType": "Date", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "events_to_users_pdf": { "name": "events_to_users_pdf", "relationship": "in", "columnName": "user_pdf_id", "dataType": "Event[]", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "order": { "name": "order", "relationship": "out", "columnName": "order_id", "dataType": "InvestmentOrder", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"Country": {
            "class": "Country"
            , "schema": "FS4"
            , "table": "COUNTRIES"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "name": { "name": "name", "relationship": "none", "columnName": "name", "dataType": "string", "length": 0 },
                "isocode2": { "name": "isocode2", "relationship": "none", "columnName": "isocode2", "dataType": "string", "length": 0 },
                "isocode3": { "name": "isocode3", "relationship": "none", "columnName": "isocode3", "dataType": "string", "length": 0 },
                "telephone_prefix": { "name": "telephone_prefix", "relationship": "none", "columnName": "telephone_prefix", "dataType": "string", "length": 0 },
                "region_id": { "name": "region_id", "relationship": "none", "columnName": "region_id", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "all_users_to_countries": { "name": "all_users_to_countries", "relationship": "in", "columnName": "country_id", "dataType": "AllUser[]", "length": 0 },
                "all_users_to_mcountries": { "name": "all_users_to_mcountries", "relationship": "in", "columnName": "mailing_country_id", "dataType": "AllUser[]", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "projects": { "name": "projects", "relationship": "in", "columnName": "country_id", "dataType": "Project[]", "length": 0 },
                "provinces_to_countries": { "name": "provinces_to_countries", "relationship": "in", "columnName": "country_id", "dataType": "Province[]", "length": 0 },
                "investor_companies": { "name": "investor_companies", "relationship": "in", "columnName": "country_id", "dataType": "UserEntity[]", "length": 0 },
                "users_socialprofile_country_id": { "name": "users_socialprofile_country_id", "relationship": "in", "columnName": "country_id", "dataType": "UserSocialProfile[]", "length": 0 }
                }
            }
        ,"UserAnswer": {
            "class": "UserAnswer"
            , "schema": "FS4"
            , "table": "USERS_QUESTIONARY"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "entity_id": { "name": "entity_id", "relationship": "none", "columnName": "entity_id", "dataType": "number", "length": 0 },
                "category": { "name": "category", "relationship": "none", "columnName": "type_id", "dataType": "RegistrationQuestionCategory", "length": 0 },
                "question_id": { "name": "question_id", "relationship": "none", "columnName": "question_id", "dataType": "number", "length": 0 },
                "question_text": { "name": "question_text", "relationship": "none", "columnName": "question_text", "dataType": "string", "length": 0 },
                "answer_type": { "name": "answer_type", "relationship": "none", "columnName": "answer_type", "dataType": "QuestionAnswerType", "length": 0 },
                "answer_text": { "name": "answer_text", "relationship": "none", "columnName": "answer_text", "dataType": "string", "length": 0 },
                "is_confirmed": { "name": "is_confirmed", "relationship": "none", "columnName": "is_confirmed", "dataType": "boolean", "length": 0 },
                "notes": { "name": "notes", "relationship": "none", "columnName": "notes", "dataType": "string", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "entity": { "name": "entity", "relationship": "out", "columnName": "entity_id", "dataType": "UserEntity", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "question": { "name": "question", "relationship": "out", "columnName": "question_id", "dataType": "RegistrationQuestion", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"Event": {
            "class": "Event"
            , "schema": "FS4"
            , "table": "EVENTS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "type": { "name": "type", "relationship": "none", "columnName": "type", "dataType": "EventType", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "issuer_id": { "name": "issuer_id", "relationship": "none", "columnName": "issuer_id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "investment_transaction_id": { "name": "investment_transaction_id", "relationship": "none", "columnName": "investment_transaction_id", "dataType": "number", "length": 0 },
                "investment_order_id": { "name": "investment_order_id", "relationship": "none", "columnName": "investment_order_id", "dataType": "number", "length": 0 },
                "investment_withdrawel_id": { "name": "investment_withdrawel_id", "relationship": "none", "columnName": "investment_withdrawel_id", "dataType": "number", "length": 0 },
                "investor_earning_id": { "name": "investor_earning_id", "relationship": "none", "columnName": "investor_earning_id", "dataType": "number", "length": 0 },
                "user_pdf_id": { "name": "user_pdf_id", "relationship": "none", "columnName": "user_pdf_id", "dataType": "number", "length": 0 },
                "additional": { "name": "additional", "relationship": "none", "columnName": "additional", "dataType": "string", "length": 0 },
                "webhooks_fired": { "name": "webhooks_fired", "relationship": "none", "columnName": "webhooks_fired", "dataType": "boolean", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "investment_order": { "name": "investment_order", "relationship": "out", "columnName": "investment_order_id", "dataType": "InvestmentOrder", "length": 0 },
                "investment_transaction": { "name": "investment_transaction", "relationship": "out", "columnName": "investment_transaction_id", "dataType": "InvestmentTransaction", "length": 0 },
                "investment_withdrawel": { "name": "investment_withdrawel", "relationship": "out", "columnName": "investment_withdrawel_id", "dataType": "InvestmentWithdrawal", "length": 0 },
                "investor_earning": { "name": "investor_earning", "relationship": "out", "columnName": "investor_earning_id", "dataType": "InvestorEarning", "length": 0 },
                "issuer": { "name": "issuer", "relationship": "out", "columnName": "issuer_id", "dataType": "UserSocialProfile", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 },
                "user_pdf": { "name": "user_pdf", "relationship": "out", "columnName": "user_pdf_id", "dataType": "UserPdf", "length": 0 }
                }
            }
        ,"UserRequest": {
            "class": "UserRequest"
            , "schema": "FS4"
            , "table": "USERS_REQUEST"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "request": { "name": "request", "relationship": "none", "columnName": "request", "dataType": "string", "length": 0 },
                "message": { "name": "message", "relationship": "none", "columnName": "message", "dataType": "string", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "UserRequestState", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"FfbaAssociation": {
            "class": "FfbaAssociation"
            , "schema": "FS4"
            , "table": "FFBA_ASSOCIATION"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "entity_id": { "name": "entity_id", "relationship": "none", "columnName": "entity_id", "dataType": "number", "length": 0 },
                "is_director": { "name": "is_director", "relationship": "none", "columnName": "is_director", "dataType": "boolean", "length": 0 },
                "is_executive_officer": { "name": "is_executive_officer", "relationship": "none", "columnName": "is_executive_officer", "dataType": "boolean", "length": 0 },
                "is_control_person": { "name": "is_control_person", "relationship": "none", "columnName": "is_control_person", "dataType": "boolean", "length": 0 },
                "is_founder": { "name": "is_founder", "relationship": "none", "columnName": "is_founder", "dataType": "boolean", "length": 0 },
                "is_family_member": { "name": "is_family_member", "relationship": "none", "columnName": "is_family_member", "dataType": "boolean", "length": 0 },
                "is_friend": { "name": "is_friend", "relationship": "none", "columnName": "is_friend", "dataType": "boolean", "length": 0 },
                "is_associate": { "name": "is_associate", "relationship": "none", "columnName": "is_associate", "dataType": "boolean", "length": 0 },
                "contact_first_name": { "name": "contact_first_name", "relationship": "none", "columnName": "contact_first_name", "dataType": "string", "length": 0 },
                "contact_last_name": { "name": "contact_last_name", "relationship": "none", "columnName": "contact_last_name", "dataType": "string", "length": 0 },
                "contact_position": { "name": "contact_position", "relationship": "none", "columnName": "contact_position", "dataType": "string", "length": 0 },
                "contact_relationship": { "name": "contact_relationship", "relationship": "none", "columnName": "contact_relationship", "dataType": "string", "length": 0 },
                "contact_years_known": { "name": "contact_years_known", "relationship": "none", "columnName": "contact_years_known", "dataType": "number", "length": 0 },
                "contact_email": { "name": "contact_email", "relationship": "none", "columnName": "contact_email", "dataType": "string", "length": 0 },
                "contact_phone": { "name": "contact_phone", "relationship": "none", "columnName": "contact_phone", "dataType": "string", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "entity": { "name": "entity", "relationship": "out", "columnName": "entity_id", "dataType": "UserEntity", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"SocialProfileFollowing": {
            "class": "SocialProfileFollowing"
            , "schema": "FS4"
            , "table": "USERS_SOCIAL_LINKUP"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "following_id": { "name": "following_id", "relationship": "none", "columnName": "profile_id", "dataType": "number", "length": 0 },
                "follower_id": { "name": "follower_id", "relationship": "none", "columnName": "link_id", "dataType": "number", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "SocialProfileFollowingStatus", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "follower": { "name": "follower", "relationship": "out", "columnName": "link_id", "dataType": "UserSocialProfile", "length": 0 },
                "following": { "name": "following", "relationship": "out", "columnName": "profile_id", "dataType": "UserSocialProfile", "length": 0 }
                }
            }
        ,"ImportedContact": {
            "class": "ImportedContact"
            , "schema": "FS4"
            , "table": "IMPORTED_CONTACTS"
            , "defaultOrderBy": "Id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "Id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "source": { "name": "source", "relationship": "none", "columnName": "source", "dataType": "string", "length": 0 },
                "contact_as_original_json": { "name": "contact_as_original_json", "relationship": "none", "columnName": "contact_as_original_json", "dataType": "string", "length": 0 },
                "contact_as_json": { "name": "contact_as_json", "relationship": "none", "columnName": "contact_as_json", "dataType": "string", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"UserSocialPost": {
            "class": "UserSocialPost"
            , "schema": "FS4"
            , "table": "USERS_SOCIAL_POST"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "post_type": { "name": "post_type", "relationship": "none", "columnName": "post_type", "dataType": "UserSocialPostType", "length": 0 },
                "profile_id": { "name": "profile_id", "relationship": "none", "columnName": "profile_id", "dataType": "number", "length": 0 },
                "related_profile_id": { "name": "related_profile_id", "relationship": "none", "columnName": "link_id", "dataType": "number", "length": 0 },
                "related_post_id": { "name": "related_post_id", "relationship": "none", "columnName": "related_post_id", "dataType": "number", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "SocialProfilePostState", "length": 0 },
                "post": { "name": "post", "relationship": "none", "columnName": "post", "dataType": "string", "length": 0 },
                "image": { "name": "image", "relationship": "none", "columnName": "image", "dataType": "string", "length": 0 },
                "link": { "name": "link", "relationship": "none", "columnName": "link", "dataType": "string", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "related_profile": { "name": "related_profile", "relationship": "out", "columnName": "link_id", "dataType": "UserSocialProfile", "length": 0 },
                "profile": { "name": "profile", "relationship": "out", "columnName": "profile_id", "dataType": "UserSocialProfile", "length": 0 },
                "related_post": { "name": "related_post", "relationship": "out", "columnName": "related_post_id", "dataType": "UserSocialPost", "length": 0 },
                "related_to": { "name": "related_to", "relationship": "in", "columnName": "related_post_id", "dataType": "UserSocialPost[]", "length": 0 }
                }
            }
        ,"UserSocialProfile": {
            "class": "UserSocialProfile"
            , "schema": "FS4"
            , "table": "USERS_SOCIAL_PROFILE"
            , "defaultOrderBy": "id"
            , "discriminator_column": "PROFILE_STATUS"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "name": { "name": "name", "relationship": "none", "columnName": "name", "dataType": "string", "length": 0 },
                "image": { "name": "image", "relationship": "none", "columnName": "image", "dataType": "string", "length": 0 },
                "facebook": { "name": "facebook", "relationship": "none", "columnName": "facebook", "dataType": "string", "length": 0 },
                "twitter": { "name": "twitter", "relationship": "none", "columnName": "twitter", "dataType": "string", "length": 0 },
                "linkedin": { "name": "linkedin", "relationship": "none", "columnName": "linkedin", "dataType": "string", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "number", "length": 0 },
                "notification": { "name": "notification", "relationship": "none", "columnName": "notification", "dataType": "boolean", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "all_users_cobranded_to_social_profile": { "name": "all_users_cobranded_to_social_profile", "relationship": "in", "columnName": "cobranded_client_of_id", "dataType": "AllUser[]", "length": 0 },
                "events_to_issuer": { "name": "events_to_issuer", "relationship": "in", "columnName": "issuer_id", "dataType": "Event[]", "length": 0 },
                "orders": { "name": "orders", "relationship": "in", "columnName": "issuer_id", "dataType": "InvestmentOrder[]", "length": 0 },
                "intended_trades": { "name": "intended_trades", "relationship": "in", "columnName": "intended_issuer_id", "dataType": "InvestorIntendedTrades[]", "length": 0 },
                "projects": { "name": "projects", "relationship": "in", "columnName": "issuer_id", "dataType": "Project[]", "length": 0 },
                "interests": { "name": "interests", "relationship": "in", "columnName": "interest_by_id", "dataType": "ProjectInterest[]", "length": 0 },
                "investor_interests": { "name": "investor_interests", "relationship": "in", "columnName": "interest_in_id", "dataType": "ProjectInterest[]", "length": 0 },
                "user_issuer_associations_to_issuer_id_associated_users": { "name": "user_issuer_associations_to_issuer_id_associated_users", "relationship": "in", "columnName": "issuer_id", "dataType": "UserIssuerAssociation[]", "length": 0 },
                "followers": { "name": "followers", "relationship": "in", "columnName": "link_id", "dataType": "SocialProfileFollowing[]", "length": 0 },
                "following": { "name": "following", "relationship": "in", "columnName": "profile_id", "dataType": "SocialProfileFollowing[]", "length": 0 },
                "posts": { "name": "posts", "relationship": "in", "columnName": "link_id", "dataType": "UserSocialPost[]", "length": 0 },
                "country": { "name": "country", "relationship": "out", "columnName": "country_id", "dataType": "Country", "length": 0 },
                "jurisdiction": { "name": "jurisdiction", "relationship": "out", "columnName": "jurisdiction_id", "dataType": "Province", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 },
                "province": { "name": "province", "relationship": "out", "columnName": "province_id", "dataType": "Province", "length": 0 },
                "statute": { "name": "statute", "relationship": "out", "columnName": "statute_id", "dataType": "Province", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 },
                "web_hooks_to_issuer": { "name": "web_hooks_to_issuer", "relationship": "in", "columnName": "issuer_id", "dataType": "WebHook[]", "length": 0 }
                }
            }
        ,"InvestmentOrder": {
            "class": "InvestmentOrder"
            , "schema": "FS4"
            , "table": "INVESTMENT_ORDERS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "entity_type": { "name": "entity_type", "relationship": "none", "columnName": "entity_type", "dataType": "EntityType", "length": 0 },
                "entity_id": { "name": "entity_id", "relationship": "none", "columnName": "entity_id", "dataType": "string", "length": 0 },
                "user_entity_id": { "name": "user_entity_id", "relationship": "none", "columnName": "user_entity_id", "dataType": "number", "length": 0 },
                "order_no": { "name": "order_no", "relationship": "none", "columnName": "order_no", "dataType": "string", "length": 0 },
                "share_price": { "name": "share_price", "relationship": "none", "columnName": "share_price", "dataType": "number", "length": 0 },
                "number_of_shares": { "name": "number_of_shares", "relationship": "none", "columnName": "number_of_shares", "dataType": "number", "length": 0 },
                "total_amount": { "name": "total_amount", "relationship": "none", "columnName": "amount", "dataType": "number", "length": 0 },
                "acknowledgements": { "name": "acknowledgements", "relationship": "none", "columnName": "acknowledgements", "dataType": "boolean", "length": 0 },
                "docusign": { "name": "docusign", "relationship": "none", "columnName": "docusign", "dataType": "boolean", "length": 0 },
                "document_name": { "name": "document_name", "relationship": "none", "columnName": "document_name", "dataType": "string", "length": 0 },
                "docusign_guid": { "name": "docusign_guid", "relationship": "none", "columnName": "docusign_guid", "dataType": "string", "length": 0 },
                "docusign_merge_hash": { "name": "docusign_merge_hash", "relationship": "none", "columnName": "docusign_merge_hash", "dataType": "string", "length": 0 },
                "payment": { "name": "payment", "relationship": "none", "columnName": "payment", "dataType": "PaymentStatus", "length": 0 },
                "roed_at_initiation": { "name": "roed_at_initiation", "relationship": "none", "columnName": "roed_at_initiation", "dataType": "number", "length": 0 },
                "payment_mode": { "name": "payment_mode", "relationship": "none", "columnName": "payment_mode", "dataType": "PaymentMethodType", "length": 0 },
                "payment_method_id": { "name": "payment_method_id", "relationship": "none", "columnName": "payment_method_id", "dataType": "number", "length": 0 },
                "investment_withdrawal_id": { "name": "investment_withdrawal_id", "relationship": "none", "columnName": "investment_withdrawal_id", "dataType": "number", "length": 0 },
                "distributions_to_id": { "name": "distributions_to_id", "relationship": "none", "columnName": "distributions_to_id", "dataType": "number", "length": 0 },
                "payments_from_id": { "name": "payments_from_id", "relationship": "none", "columnName": "payments_from_id", "dataType": "number", "length": 0 },
                "roed_schedule1_id": { "name": "roed_schedule1_id", "relationship": "none", "columnName": "roed_schedule1_id", "dataType": "number", "length": 0 },
                "order_confirm": { "name": "order_confirm", "relationship": "none", "columnName": "order_confirm", "dataType": "boolean", "length": 0 },
                "drip_registered": { "name": "drip_registered", "relationship": "none", "columnName": "drip_registered", "dataType": "boolean", "length": 0 },
                "acquiring_with_assets": { "name": "acquiring_with_assets", "relationship": "none", "columnName": "acquiring_with_assets", "dataType": "boolean", "length": 0 },
                "total_assets_150_k": { "name": "total_assets_150_k", "relationship": "none", "columnName": "total_assets_150k", "dataType": "boolean", "length": 0 },
                "transferring_assets": { "name": "transferring_assets", "relationship": "none", "columnName": "transferring_assets", "dataType": "boolean", "length": 0 },
                "transfer_whole_or_part": { "name": "transfer_whole_or_part", "relationship": "none", "columnName": "transfer_whole_or_part", "dataType": "boolean", "length": 0 },
                "hubspot_creation": { "name": "hubspot_creation", "relationship": "none", "columnName": "hubspot_creation", "dataType": "number", "length": 0 },
                "hubspot_dealid": { "name": "hubspot_dealid", "relationship": "none", "columnName": "hubspot_dealid", "dataType": "string", "length": 0 },
                "escrow_no": { "name": "escrow_no", "relationship": "none", "columnName": "escrow_no", "dataType": "string", "length": 0 },
                "escrow_settled_no": { "name": "escrow_settled_no", "relationship": "none", "columnName": "escrow_settled_no", "dataType": "string", "length": 0 },
                "refund_no": { "name": "refund_no", "relationship": "none", "columnName": "refund_no", "dataType": "string", "length": 0 },
                "refund_settled_no": { "name": "refund_settled_no", "relationship": "none", "columnName": "refund_settled_no", "dataType": "string", "length": 0 },
                "transfer_no": { "name": "transfer_no", "relationship": "none", "columnName": "transfer_no", "dataType": "string", "length": 0 },
                "trust_company_name": { "name": "trust_company_name", "relationship": "none", "columnName": "trust_company_name", "dataType": "string", "length": 0 },
                "trust_company_account_no": { "name": "trust_company_account_no", "relationship": "none", "columnName": "trust_company_account_no", "dataType": "string", "length": 0 },
                "sale_price": { "name": "sale_price", "relationship": "none", "columnName": "sale_price", "dataType": "number", "length": 0 },
                "agent_comm": { "name": "agent_comm", "relationship": "none", "columnName": "agent_comm", "dataType": "number", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "InvestmentOrderStatus", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "issuer_id": { "name": "issuer_id", "relationship": "none", "columnName": "issuer_id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "ffba_id": { "name": "ffba_id", "relationship": "none", "columnName": "ffba_id", "dataType": "number", "length": 0 },
                "joint_subscriber_id": { "name": "joint_subscriber_id", "relationship": "none", "columnName": "joint_subscriber_id", "dataType": "number", "length": 0 },
                "filed_roed_row_match": { "name": "filed_roed_row_match", "relationship": "none", "columnName": "filed_roed_row_match", "dataType": "number", "length": 0 },
                "order_date": { "name": "order_date", "relationship": "none", "columnName": "order_date", "dataType": "Date", "length": 0 },
                "docusign_date": { "name": "docusign_date", "relationship": "none", "columnName": "docusign_date", "dataType": "Date", "length": 0 },
                "escrow_date": { "name": "escrow_date", "relationship": "none", "columnName": "escrow_date", "dataType": "Date", "length": 0 },
                "transfer_date": { "name": "transfer_date", "relationship": "none", "columnName": "transfer_date", "dataType": "Date", "length": 0 },
                "transfer_settled_date": { "name": "transfer_settled_date", "relationship": "none", "columnName": "transfer_settled_date", "dataType": "Date", "length": 0 },
                "escrow_settled_date": { "name": "escrow_settled_date", "relationship": "none", "columnName": "escrow_settled_date", "dataType": "Date", "length": 0 },
                "refund_settled_date": { "name": "refund_settled_date", "relationship": "none", "columnName": "refund_settled_date", "dataType": "Date", "length": 0 },
                "refund_date": { "name": "refund_date", "relationship": "none", "columnName": "refund_date", "dataType": "Date", "length": 0 },
                "sell_date": { "name": "sell_date", "relationship": "none", "columnName": "sell_date", "dataType": "Date", "length": 0 },
                "trade_date": { "name": "trade_date", "relationship": "none", "columnName": "trade_date", "dataType": "Date", "length": 0 },
                "estimated_trade_date": { "name": "estimated_trade_date", "relationship": "none", "columnName": "estimated_trade_date", "dataType": "Date", "length": 0 },
                "transfer_old_id": { "name": "transfer_old_id", "relationship": "none", "columnName": "transfer_old_id", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "events_to_investment_order": { "name": "events_to_investment_order", "relationship": "in", "columnName": "investment_order_id", "dataType": "Event[]", "length": 0 },
                "distributions_to": { "name": "distributions_to", "relationship": "out", "columnName": "distributions_to_id", "dataType": "UserBankingDetails", "length": 0 },
                "ffba": { "name": "ffba", "relationship": "out", "columnName": "ffba_id", "dataType": "FfbaAssociation", "length": 0 },
                "investment_withdrawal": { "name": "investment_withdrawal", "relationship": "out", "columnName": "investment_withdrawal_id", "dataType": "InvestmentWithdrawal", "length": 0 },
                "issuer": { "name": "issuer", "relationship": "out", "columnName": "issuer_id", "dataType": "UserSocialProfile", "length": 0 },
                "joint_subscriber": { "name": "joint_subscriber", "relationship": "out", "columnName": "joint_subscriber_id", "dataType": "AllUser", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "payment_method": { "name": "payment_method", "relationship": "out", "columnName": "payment_method_id", "dataType": "ProjectAccount", "length": 0 },
                "payments_from": { "name": "payments_from", "relationship": "out", "columnName": "payments_from_id", "dataType": "UserBankingDetails", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 },
                "roed_schedule1": { "name": "roed_schedule1", "relationship": "out", "columnName": "roed_schedule1_id", "dataType": "RoedSchedule1", "length": 0 },
                "transfer_old": { "name": "transfer_old", "relationship": "out", "columnName": "transfer_old_id", "dataType": "InvestmentOrder", "length": 0 },
                "user_entity": { "name": "user_entity", "relationship": "out", "columnName": "user_entity_id", "dataType": "UserEntity", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 },
                "investment_withdrawal_head_to_investment_orders": { "name": "investment_withdrawal_head_to_investment_orders", "relationship": "in", "columnName": "order_id", "dataType": "InvestmentWithdrawal[]", "length": 0 },
                "acknowledgement_details": { "name": "acknowledgement_details", "relationship": "in", "columnName": "order_id", "dataType": "OrderAcknowledgement[]", "length": 0 },
                "adjustments": { "name": "adjustments", "relationship": "in", "columnName": "order_id", "dataType": "InvestorEarning[]", "length": 0 },
                "pdfs": { "name": "pdfs", "relationship": "in", "columnName": "order_id", "dataType": "UserPdf[]", "length": 0 }
                }
            }
        ,"UserSubscription": {
            "class": "UserSubscription"
            , "schema": "FS4"
            , "table": "USERS_SUBSCRIBE"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "flag": { "name": "flag", "relationship": "none", "columnName": "flag", "dataType": "string", "length": 0 },
                "email": { "name": "email", "relationship": "none", "columnName": "email", "dataType": "string", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "UserSubscriptionState", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"InvestmentTransaction": {
            "class": "InvestmentTransaction"
            , "schema": "FS4"
            , "table": "INVESTMENT_TRANSACTION"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "entity_type": { "name": "entity_type", "relationship": "none", "columnName": "entity_type", "dataType": "EntityType", "length": 0 },
                "entity_id": { "name": "entity_id", "relationship": "none", "columnName": "entity_id", "dataType": "string", "length": 0 },
                "user_entity_id": { "name": "user_entity_id", "relationship": "none", "columnName": "user_entity_id", "dataType": "number", "length": 0 },
                "order_no": { "name": "order_no", "relationship": "none", "columnName": "order_no", "dataType": "string", "length": 0 },
                "order_id": { "name": "order_id", "relationship": "none", "columnName": "order_id", "dataType": "number", "length": 0 },
                "activity": { "name": "activity", "relationship": "none", "columnName": "activity", "dataType": "InvestmentActivity", "length": 0 },
                "activity_desc": { "name": "activity_desc", "relationship": "none", "columnName": "activity_desc", "dataType": "string", "length": 0 },
                "number_of_shares": { "name": "number_of_shares", "relationship": "none", "columnName": "number_of_shares", "dataType": "number", "length": 0 },
                "amount_per_share": { "name": "amount_per_share", "relationship": "none", "columnName": "amount_per_share", "dataType": "number", "length": 0 },
                "credit": { "name": "credit", "relationship": "none", "columnName": "credit", "dataType": "number", "length": 0 },
                "debit": { "name": "debit", "relationship": "none", "columnName": "debit", "dataType": "number", "length": 0 },
                "is_cancelled": { "name": "is_cancelled", "relationship": "none", "columnName": "status", "dataType": "boolean", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "transaction_date": { "name": "transaction_date", "relationship": "none", "columnName": "transaction_date", "dataType": "Date", "length": 0 },
                "eft_file": { "name": "eft_file", "relationship": "none", "columnName": "eft_file", "dataType": "string", "length": 0 },
                "investor_earning_id": { "name": "investor_earning_id", "relationship": "none", "columnName": "investor_earning_id", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "events_to_investment_transaction": { "name": "events_to_investment_transaction", "relationship": "in", "columnName": "investment_transaction_id", "dataType": "Event[]", "length": 0 },
                "investor_earning": { "name": "investor_earning", "relationship": "out", "columnName": "investor_earning_id", "dataType": "InvestorEarning", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "order": { "name": "order", "relationship": "out", "columnName": "order_id", "dataType": "InvestmentOrder", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 },
                "user_entity": { "name": "user_entity", "relationship": "out", "columnName": "user_entity_id", "dataType": "UserEntity", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"WebHook": {
            "class": "WebHook"
            , "schema": "FS4"
            , "table": "WEB_HOOKS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "event_type": { "name": "event_type", "relationship": "none", "columnName": "event_type", "dataType": "EventType", "length": 0 },
                "url": { "name": "url", "relationship": "none", "columnName": "url", "dataType": "string", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "issuer_id": { "name": "issuer_id", "relationship": "none", "columnName": "issuer_id", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "issuer": { "name": "issuer", "relationship": "out", "columnName": "issuer_id", "dataType": "UserSocialProfile", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"InvestmentWatchlist": {
            "class": "InvestmentWatchlist"
            , "schema": "FS4"
            , "table": "INVESTMENT_WATCHLIST"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "at20": { "name": "at20", "relationship": "none", "columnName": "at20", "dataType": "boolean", "length": 0 },
                "at40": { "name": "at40", "relationship": "none", "columnName": "at40", "dataType": "boolean", "length": 0 },
                "at60": { "name": "at60", "relationship": "none", "columnName": "at60", "dataType": "boolean", "length": 0 },
                "at80": { "name": "at80", "relationship": "none", "columnName": "at80", "dataType": "boolean", "length": 0 },
                "at100": { "name": "at100", "relationship": "none", "columnName": "at100", "dataType": "boolean", "length": 0 },
                "in_active": { "name": "in_active", "relationship": "none", "columnName": "status", "dataType": "boolean", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"InvestmentWithdrawal": {
            "class": "InvestmentWithdrawal"
            , "schema": "FS4"
            , "table": "INVESTMENT_WITHDRAWAL"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "order_id": { "name": "order_id", "relationship": "none", "columnName": "order_id", "dataType": "number", "length": 0 },
                "amount": { "name": "amount", "relationship": "none", "columnName": "amount", "dataType": "number", "length": 0 },
                "bank_name": { "name": "bank_name", "relationship": "none", "columnName": "bank_name", "dataType": "string", "length": 0 },
                "bank_institution_number": { "name": "bank_institution_number", "relationship": "none", "columnName": "bank_institution_number", "dataType": "string", "length": 0 },
                "bank_transit": { "name": "bank_transit", "relationship": "none", "columnName": "bank_transit", "dataType": "string", "length": 0 },
                "bank_account_number": { "name": "bank_account_number", "relationship": "none", "columnName": "bank_account_number", "dataType": "string", "length": 0 },
                "bank_address": { "name": "bank_address", "relationship": "none", "columnName": "bank_address", "dataType": "string", "length": 0 },
                "bank_province_id": { "name": "bank_province_id", "relationship": "none", "columnName": "bank_province_id", "dataType": "number", "length": 0 },
                "bank_city": { "name": "bank_city", "relationship": "none", "columnName": "bank_city", "dataType": "string", "length": 0 },
                "bank_postal_code": { "name": "bank_postal_code", "relationship": "none", "columnName": "bank_postal_code", "dataType": "string", "length": 0 },
                "bank_telephone": { "name": "bank_telephone", "relationship": "none", "columnName": "bank_telephone", "dataType": "string", "length": 0 },
                "number_of_withdrawels": { "name": "number_of_withdrawels", "relationship": "none", "columnName": "number_of_withdrawels", "dataType": "number", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "events_to_investment_withdrawel": { "name": "events_to_investment_withdrawel", "relationship": "in", "columnName": "investment_withdrawel_id", "dataType": "Event[]", "length": 0 },
                "bank_province": { "name": "bank_province", "relationship": "out", "columnName": "bank_province_id", "dataType": "Province", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "order": { "name": "order", "relationship": "out", "columnName": "order_id", "dataType": "InvestmentOrder", "length": 0 }
                }
            }
        ,"OrderAcknowledgement": {
            "class": "OrderAcknowledgement"
            , "schema": "FS4"
            , "table": "INVESTOR_ACK_ORDERS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "order_id": { "name": "order_id", "relationship": "none", "columnName": "order_id", "dataType": "number", "length": 0 },
                "acknowledgement_order": { "name": "acknowledgement_order", "relationship": "none", "columnName": "question_id", "dataType": "number", "length": 0 },
                "question_text": { "name": "question_text", "relationship": "none", "columnName": "question_text", "dataType": "string", "length": 0 },
                "answer": { "name": "answer", "relationship": "none", "columnName": "answer", "dataType": "string", "length": 0 },
                "answer_text": { "name": "answer_text", "relationship": "none", "columnName": "answer_text", "dataType": "string", "length": 0 },
                "additional_answer": { "name": "additional_answer", "relationship": "none", "columnName": "additional_answer", "dataType": "string", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "order": { "name": "order", "relationship": "out", "columnName": "order_id", "dataType": "InvestmentOrder", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"OrderAcknowledgementQuestion": {
            "class": "OrderAcknowledgementQuestion"
            , "schema": "FS4"
            , "table": "INVESTOR_ACKNOWLEDGEMENTS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "question": { "name": "question", "relationship": "none", "columnName": "question", "dataType": "string", "length": 0 },
                "answer_type": { "name": "answer_type", "relationship": "none", "columnName": "answer_type", "dataType": "QuestionAnswerType", "length": 0 },
                "explanation": { "name": "explanation", "relationship": "none", "columnName": "explanation", "dataType": "string", "length": 0 },
                "additional_acknowldgement": { "name": "additional_acknowldgement", "relationship": "none", "columnName": "additional_acknowldgement", "dataType": "string", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "visible": { "name": "visible", "relationship": "none", "columnName": "visible", "dataType": "boolean", "length": 0 },
                "om_component": { "name": "om_component", "relationship": "none", "columnName": "om_component", "dataType": "number", "length": 0 },
                "wellknown": { "name": "wellknown", "relationship": "none", "columnName": "wellknown", "dataType": "string", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"InvestorEarning": {
            "class": "InvestorEarning"
            , "schema": "FS4"
            , "table": "INVESTOR_EARNINGS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_earnings_id": { "name": "project_earnings_id", "relationship": "none", "columnName": "pe_id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "order_id": { "name": "order_id", "relationship": "none", "columnName": "order_id", "dataType": "number", "length": 0 },
                "entity_type": { "name": "entity_type", "relationship": "none", "columnName": "entity_type", "dataType": "EntityType", "length": 0 },
                "entity_id": { "name": "entity_id", "relationship": "none", "columnName": "entity_id", "dataType": "string", "length": 0 },
                "user_entity_id": { "name": "user_entity_id", "relationship": "none", "columnName": "user_entity_id", "dataType": "number", "length": 0 },
                "type": { "name": "type", "relationship": "none", "columnName": "type_id", "dataType": "EarningsAdjustmentType", "length": 0 },
                "category": { "name": "category", "relationship": "none", "columnName": "category", "dataType": "string", "length": 0 },
                "description": { "name": "description", "relationship": "none", "columnName": "description", "dataType": "string", "length": 0 },
                "amount": { "name": "amount", "relationship": "none", "columnName": "amount", "dataType": "number", "length": 0 },
                "transaction_date": { "name": "transaction_date", "relationship": "none", "columnName": "transaction_date", "dataType": "Date", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "events_to_investor_earnings": { "name": "events_to_investor_earnings", "relationship": "in", "columnName": "investor_earning_id", "dataType": "Event[]", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "order": { "name": "order", "relationship": "out", "columnName": "order_id", "dataType": "InvestmentOrder", "length": 0 },
                "project_earnings": { "name": "project_earnings", "relationship": "out", "columnName": "pe_id", "dataType": "ProjectBalanceAdjustment", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 },
                "user_entity": { "name": "user_entity", "relationship": "out", "columnName": "user_entity_id", "dataType": "UserEntity", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"InvestorIntendedTrades": {
            "class": "InvestorIntendedTrades"
            , "schema": "FS4"
            , "table": "INVESTOR_INTENDED_TRADES"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "intended_issuer_id": { "name": "intended_issuer_id", "relationship": "none", "columnName": "intended_issuer_id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "intended_trade_amount": { "name": "intended_trade_amount", "relationship": "none", "columnName": "intended_trade_amount", "dataType": "number", "length": 0 },
                "intended_trade_date": { "name": "intended_trade_date", "relationship": "none", "columnName": "intended_trade_date", "dataType": "Date", "length": 0 },
                "notes": { "name": "notes", "relationship": "none", "columnName": "notes", "dataType": "string", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "intended_issuer": { "name": "intended_issuer", "relationship": "out", "columnName": "intended_issuer_id", "dataType": "UserSocialProfile", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"Mail": {
            "class": "Mail"
            , "schema": "FS4"
            , "table": "MAILS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "to_id": { "name": "to_id", "relationship": "none", "columnName": "to_id", "dataType": "number", "length": 0 },
                "from_id": { "name": "from_id", "relationship": "none", "columnName": "from_id", "dataType": "number", "length": 0 },
                "address_sent_to": { "name": "address_sent_to", "relationship": "none", "columnName": "address_sent_to", "dataType": "string", "length": 0 },
                "subject": { "name": "subject", "relationship": "none", "columnName": "subject", "dataType": "string", "length": 0 },
                "body": { "name": "body", "relationship": "none", "columnName": "body", "dataType": "string", "length": 0 },
                "raw_body": { "name": "raw_body", "relationship": "none", "columnName": "raw_body", "dataType": "string", "length": 0 },
                "sent_ok": { "name": "sent_ok", "relationship": "none", "columnName": "sent_ok", "dataType": "boolean", "length": 0 },
                "attachment": { "name": "attachment", "relationship": "none", "columnName": "attachment", "dataType": "string", "length": 0 },
                "flag": { "name": "flag", "relationship": "none", "columnName": "flag", "dataType": "boolean", "length": 0 },
                "stared": { "name": "stared", "relationship": "none", "columnName": "stared", "dataType": "boolean", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "EMailStatus", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "from": { "name": "from", "relationship": "out", "columnName": "from_id", "dataType": "AllUser", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "to": { "name": "to", "relationship": "out", "columnName": "to_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"Menu": {
            "class": "Menu"
            , "schema": "FS4"
            , "table": "MENU"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "page_id": { "name": "page_id", "relationship": "none", "columnName": "page_id", "dataType": "number", "length": 0 },
                "name": { "name": "name", "relationship": "none", "columnName": "name", "dataType": "string", "length": 0 },
                "name_seo": { "name": "name_seo", "relationship": "none", "columnName": "name_seo", "dataType": "string", "length": 0 },
                "image": { "name": "image", "relationship": "none", "columnName": "image", "dataType": "string", "length": 0 },
                "content": { "name": "content", "relationship": "none", "columnName": "content", "dataType": "string", "length": 0 },
                "content2": { "name": "content2", "relationship": "none", "columnName": "content2", "dataType": "string", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"ModuleAccess": {
            "class": "ModuleAccess"
            , "schema": "FS4"
            , "table": "MODULE_ACCESS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "module_id": { "name": "module_id", "relationship": "none", "columnName": "module_id", "dataType": "number", "length": 0 },
                "can_view": { "name": "can_view", "relationship": "none", "columnName": "permission", "dataType": "boolean", "length": 0 },
                "can_add": { "name": "can_add", "relationship": "none", "columnName": "can_add", "dataType": "boolean", "length": 0 },
                "can_edit": { "name": "can_edit", "relationship": "none", "columnName": "can_edit", "dataType": "boolean", "length": 0 },
                "can_delete": { "name": "can_delete", "relationship": "none", "columnName": "can_delete", "dataType": "boolean", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "module": { "name": "module", "relationship": "out", "columnName": "module_id", "dataType": "AdminModule", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"AdminModule": {
            "class": "AdminModule"
            , "schema": "FS4"
            , "table": "MODULES"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "sub_id": { "name": "sub_id", "relationship": "none", "columnName": "sub_id", "dataType": "number", "length": 0 },
                "name": { "name": "name", "relationship": "none", "columnName": "name", "dataType": "string", "length": 0 },
                "module_seo": { "name": "module_seo", "relationship": "none", "columnName": "module_seo", "dataType": "string", "length": 0 },
                "module_icon": { "name": "module_icon", "relationship": "none", "columnName": "module_icon", "dataType": "string", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "number", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "grants": { "name": "grants", "relationship": "in", "columnName": "module_id", "dataType": "ModuleAccess[]", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "sub": { "name": "sub", "relationship": "out", "columnName": "sub_id", "dataType": "AdminModule", "length": 0 },
                "child_modules": { "name": "child_modules", "relationship": "in", "columnName": "sub_id", "dataType": "AdminModule[]", "length": 0 }
                }
            }
        ,"ProjectAccount": {
            "class": "ProjectAccount"
            , "schema": "FS4"
            , "table": "PAYMENT_METHODS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "method": { "name": "method", "relationship": "none", "columnName": "method", "dataType": "number", "length": 0 },
                "eligibility_types": { "name": "eligibility_types", "relationship": "none", "columnName": "eligibility_types", "dataType": "string", "length": 0 },
                "payment_type": { "name": "payment_type", "relationship": "none", "columnName": "payment_type", "dataType": "PaymentMethodType", "length": 0 },
                "trust_name": { "name": "trust_name", "relationship": "none", "columnName": "trust_name", "dataType": "string", "length": 0 },
                "trust_address": { "name": "trust_address", "relationship": "none", "columnName": "email", "dataType": "string", "length": 0 },
                "trust_contact": { "name": "trust_contact", "relationship": "none", "columnName": "trust_contact", "dataType": "string", "length": 0 },
                "institution": { "name": "institution", "relationship": "none", "columnName": "institution", "dataType": "string", "length": 0 },
                "institution_number": { "name": "institution_number", "relationship": "none", "columnName": "inst_no", "dataType": "string", "length": 0 },
                "branch_number": { "name": "branch_number", "relationship": "none", "columnName": "branch_no", "dataType": "string", "length": 0 },
                "bank_account_number": { "name": "bank_account_number", "relationship": "none", "columnName": "bank_ac", "dataType": "string", "length": 0 },
                "branch_mailing_address": { "name": "branch_mailing_address", "relationship": "none", "columnName": "bank_address", "dataType": "string", "length": 0 },
                "swift_code": { "name": "swift_code", "relationship": "none", "columnName": "swift_code", "dataType": "string", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "custom_text": { "name": "custom_text", "relationship": "none", "columnName": "custom_text", "dataType": "string", "length": 0 },
                "is_active": { "name": "is_active", "relationship": "none", "columnName": "status", "dataType": "boolean", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 }
                }
            }
        ,"ProfileBackground": {
            "class": "ProfileBackground"
            , "schema": "FS4"
            , "table": "PROFILE_BACKGROUND"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "image": { "name": "image", "relationship": "none", "columnName": "image", "dataType": "string", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"ProjectDocusignMapping": {
            "class": "ProjectDocusignMapping"
            , "schema": "FS4"
            , "table": "PROJECT_DOCUSIGN_MAPPINGS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_applied_to_id": { "name": "project_applied_to_id", "relationship": "none", "columnName": "project_applied_to_id", "dataType": "number", "length": 0 },
                "ordinal_application_order": { "name": "ordinal_application_order", "relationship": "none", "columnName": "ordinal_application_order", "dataType": "number", "length": 0 },
                "docusign_template_guid": { "name": "docusign_template_guid", "relationship": "none", "columnName": "docusign_template_guid", "dataType": "string", "length": 0 },
                "dil_conditions_to_apply": { "name": "dil_conditions_to_apply", "relationship": "none", "columnName": "dil_conditions_to_apply", "dataType": "string", "length": 0 },
                "merge_rules": { "name": "merge_rules", "relationship": "none", "columnName": "merge_rules", "dataType": "string", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project_applied_to": { "name": "project_applied_to", "relationship": "out", "columnName": "project_applied_to_id", "dataType": "Project", "length": 0 }
                }
            }
        ,"ProjectBalanceAdjustment": {
            "class": "ProjectBalanceAdjustment"
            , "schema": "FS4"
            , "table": "PROJECT_EARNINGS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "adjustment_type": { "name": "adjustment_type", "relationship": "none", "columnName": "type_id", "dataType": "ProjectAdjustmentType", "length": 0 },
                "category": { "name": "category", "relationship": "none", "columnName": "category", "dataType": "InvestmentActivity", "length": 0 },
                "description": { "name": "description", "relationship": "none", "columnName": "description", "dataType": "string", "length": 0 },
                "amount": { "name": "amount", "relationship": "none", "columnName": "amount", "dataType": "number", "length": 0 },
                "transaction_date": { "name": "transaction_date", "relationship": "none", "columnName": "transaction_date", "dataType": "Date", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "investor_earnings": { "name": "investor_earnings", "relationship": "in", "columnName": "pe_id", "dataType": "InvestorEarning[]", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 }
                }
            }
        ,"ProjectEntity": {
            "class": "ProjectEntity"
            , "schema": "FS4"
            , "table": "PROJECT_ENTITY"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "tab_id": { "name": "tab_id", "relationship": "none", "columnName": "tab_id", "dataType": "number", "length": 0 },
                "entity_type": { "name": "entity_type", "relationship": "none", "columnName": "entity_id", "dataType": "ProjectEntityType", "length": 0 },
                "title": { "name": "title", "relationship": "none", "columnName": "title", "dataType": "string", "length": 0 },
                "title_2": { "name": "title_2", "relationship": "none", "columnName": "title_2", "dataType": "string", "length": 0 },
                "contents": { "name": "contents", "relationship": "none", "columnName": "contents", "dataType": "string", "length": 0 },
                "image": { "name": "image", "relationship": "none", "columnName": "image", "dataType": "string", "length": 0 },
                "visible": { "name": "visible", "relationship": "none", "columnName": "visible", "dataType": "boolean", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 },
                "details": { "name": "details", "relationship": "in", "columnName": "project_entity_id", "dataType": "ProjectEntityDetail[]", "length": 0 },
                "images": { "name": "images", "relationship": "in", "columnName": "project_entity_id", "dataType": "ProjectImage[]", "length": 0 },
                "backers": { "name": "backers", "relationship": "in", "columnName": "project_entity_id", "dataType": "ProjectKeybacker[]", "length": 0 }
                }
            }
        ,"ProjectEntityDetail": {
            "class": "ProjectEntityDetail"
            , "schema": "FS4"
            , "table": "PROJECT_ENTITY_DETAILS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_entity_id": { "name": "project_entity_id", "relationship": "none", "columnName": "project_entity_id", "dataType": "number", "length": 0 },
                "f1": { "name": "f1", "relationship": "none", "columnName": "f1", "dataType": "string", "length": 0 },
                "f2": { "name": "f2", "relationship": "none", "columnName": "f2", "dataType": "string", "length": 0 },
                "f3": { "name": "f3", "relationship": "none", "columnName": "f3", "dataType": "string", "length": 0 },
                "f4": { "name": "f4", "relationship": "none", "columnName": "f4", "dataType": "string", "length": 0 },
                "f5": { "name": "f5", "relationship": "none", "columnName": "f5", "dataType": "string", "length": 0 },
                "f6": { "name": "f6", "relationship": "none", "columnName": "f6", "dataType": "string", "length": 0 },
                "f7": { "name": "f7", "relationship": "none", "columnName": "f7", "dataType": "string", "length": 0 },
                "f8": { "name": "f8", "relationship": "none", "columnName": "f8", "dataType": "string", "length": 0 },
                "f9": { "name": "f9", "relationship": "none", "columnName": "f9", "dataType": "string", "length": 0 },
                "f10": { "name": "f10", "relationship": "none", "columnName": "f10", "dataType": "string", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project_entity": { "name": "project_entity", "relationship": "out", "columnName": "project_entity_id", "dataType": "ProjectEntity", "length": 0 }
                }
            }
        ,"ProjectImage": {
            "class": "ProjectImage"
            , "schema": "FS4"
            , "table": "PROJECT_IMAGES"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "project_entity_id": { "name": "project_entity_id", "relationship": "none", "columnName": "project_entity_id", "dataType": "number", "length": 0 },
                "title": { "name": "title", "relationship": "none", "columnName": "title", "dataType": "string", "length": 0 },
                "image": { "name": "image", "relationship": "none", "columnName": "image", "dataType": "string", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project_entity": { "name": "project_entity", "relationship": "out", "columnName": "project_entity_id", "dataType": "ProjectEntity", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 }
                }
            }
        ,"ProjectKeybacker": {
            "class": "ProjectKeybacker"
            , "schema": "FS4"
            , "table": "PROJECT_KEYBACKERS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "project_entity_id": { "name": "project_entity_id", "relationship": "none", "columnName": "project_entity_id", "dataType": "number", "length": 0 },
                "name": { "name": "name", "relationship": "none", "columnName": "name", "dataType": "string", "length": 0 },
                "type": { "name": "type", "relationship": "none", "columnName": "type", "dataType": "string", "length": 0 },
                "city": { "name": "city", "relationship": "none", "columnName": "city", "dataType": "string", "length": 0 },
                "work": { "name": "work", "relationship": "none", "columnName": "work", "dataType": "string", "length": 0 },
                "info": { "name": "info", "relationship": "none", "columnName": "info", "dataType": "string", "length": 0 },
                "image": { "name": "image", "relationship": "none", "columnName": "image", "dataType": "string", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project_entity": { "name": "project_entity", "relationship": "out", "columnName": "project_entity_id", "dataType": "ProjectEntity", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 }
                }
            }
        ,"ProjectPdf": {
            "class": "ProjectPdf"
            , "schema": "FS4"
            , "table": "PROJECT_PDFS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "project_entity_id": { "name": "project_entity_id", "relationship": "none", "columnName": "project_entity_id", "dataType": "number", "length": 0 },
                "title": { "name": "title", "relationship": "none", "columnName": "title", "dataType": "string", "length": 0 },
                "filename": { "name": "filename", "relationship": "none", "columnName": "filename", "dataType": "string", "length": 0 },
                "visible": { "name": "visible", "relationship": "none", "columnName": "visible", "dataType": "boolean", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 }
                }
            }
        ,"ExemptDistributionOption": {
            "class": "ExemptDistributionOption"
            , "schema": "FS4"
            , "table": "PROJECT_ROED"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "category": { "name": "category", "relationship": "none", "columnName": "category", "dataType": "ROEDCategory", "length": 0 },
                "code": { "name": "code", "relationship": "none", "columnName": "title", "dataType": "string", "length": 0 },
                "detail": { "name": "detail", "relationship": "none", "columnName": "detail", "dataType": "string", "length": 0 },
                "sort_order": { "name": "sort_order", "relationship": "none", "columnName": "sort_order", "dataType": "number", "length": 0 },
                "inactive": { "name": "inactive", "relationship": "none", "columnName": "status", "dataType": "boolean", "length": 0 },
                "regional_variation_of": { "name": "regional_variation_of", "relationship": "none", "columnName": "regional_variation_of", "dataType": "string", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "projects": { "name": "projects", "relationship": "in", "columnName": "roed_securitycode", "dataType": "Project[]", "length": 0 }
                }
            }
        ,"ProjectStatusReport": {
            "class": "ProjectStatusReport"
            , "schema": "FS4"
            , "table": "PROJECT_STATUS_REPORTS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "contents": { "name": "contents", "relationship": "none", "columnName": "contents", "dataType": "string", "length": 0 },
                "document": { "name": "document", "relationship": "none", "columnName": "document", "dataType": "string", "length": 0 },
                "report_date": { "name": "report_date", "relationship": "none", "columnName": "report_date", "dataType": "Date", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 }
                }
            }
        ,"ProjectTaxReport": {
            "class": "ProjectTaxReport"
            , "schema": "FS4"
            , "table": "PROJECT_TAX_REPORTS"
            , "defaultOrderBy": "id"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "taxation_year": { "name": "taxation_year", "relationship": "none", "columnName": "taxation_year", "dataType": "number", "length": 0 },
                "remarks": { "name": "remarks", "relationship": "none", "columnName": "remarks", "dataType": "string", "length": 0 },
                "document": { "name": "document", "relationship": "none", "columnName": "document", "dataType": "string", "length": 0 },
                "view_count": { "name": "view_count", "relationship": "none", "columnName": "view_count", "dataType": "number", "length": 0 },
                "is_published": { "name": "is_published", "relationship": "none", "columnName": "status", "dataType": "boolean", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "last_changed_by": { "name": "last_changed_by", "relationship": "out", "columnName": "last_changed_by_id", "dataType": "AllUser", "length": 0 },
                "project": { "name": "project", "relationship": "out", "columnName": "project_id", "dataType": "Project", "length": 0 },
                "user": { "name": "user", "relationship": "out", "columnName": "user_id", "dataType": "AllUser", "length": 0 }
                }
            }
        ,"AdminUser": {
            "class": "AdminUser"
            , "schema": "FS4"
            , "table": "ADMIN_USERS"
            , "defaultOrderBy": "ID"
            , "parentTable": "FS4.ALL_USERS"
            , "parentClass": "AllUser"
            , "discriminator": "a"
            , "discriminator_column": "USER_TYPE"
            , "properties": {
                "role": { "name": "role", "relationship": "none", "columnName": "role", "dataType": "string", "length": 0 },
                "username": { "name": "username", "relationship": "none", "columnName": "username", "dataType": "string", "length": 0 },
                "token": { "name": "token", "relationship": "none", "columnName": "token", "dataType": "string", "length": 0 },
                "token_update": { "name": "token_update", "relationship": "none", "columnName": "token_update", "dataType": "Date", "length": 0 },
                "admin_role": { "name": "admin_role", "relationship": "none", "columnName": "userrole", "dataType": "AdminUserRole", "length": 0 },
                "availability": { "name": "availability", "relationship": "none", "columnName": "status", "dataType": "AdminAccountAvailability", "length": 0 },
                "timezone": { "name": "timezone", "relationship": "none", "columnName": "timezone", "dataType": "string", "length": 0 },
                "location": { "name": "location", "relationship": "none", "columnName": "location", "dataType": "string", "length": 0 },
                "flag": { "name": "flag", "relationship": "none", "columnName": "flag", "dataType": "string", "length": 0 }
                }
            }
        ,"AllUserAnswer": {
            "class": "AllUserAnswer"
            , "schema": "FS4"
            , "table": "ALL_USERS_ANSWERS"
            , "defaultOrderBy": "ID"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "string", "length": 0 },
                "question_type": { "name": "question_type", "relationship": "none", "columnName": "question_type", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "user_entity_id": { "name": "user_entity_id", "relationship": "none", "columnName": "user_entity_id", "dataType": "number", "length": 0 },
                "order_id": { "name": "order_id", "relationship": "none", "columnName": "order_id", "dataType": "number", "length": 0 },
                "question_id": { "name": "question_id", "relationship": "none", "columnName": "question_id", "dataType": "number", "length": 0 },
                "question_text": { "name": "question_text", "relationship": "none", "columnName": "question_text", "dataType": "string", "length": 0 },
                "answer_text": { "name": "answer_text", "relationship": "none", "columnName": "answer_text", "dataType": "string", "length": 0 },
                "did_answer": { "name": "did_answer", "relationship": "none", "columnName": "did_answer", "dataType": "number", "length": 0 },
                "notes": { "name": "notes", "relationship": "none", "columnName": "notes", "dataType": "string", "length": 0 },
                "is_confirmed": { "name": "is_confirmed", "relationship": "none", "columnName": "is_confirmed", "dataType": "boolean", "length": 0 },
                "category": { "name": "category", "relationship": "none", "columnName": "category", "dataType": "number", "length": 0 },
                "presentation_type": { "name": "presentation_type", "relationship": "none", "columnName": "presentation_type", "dataType": "number", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 }
                }
            }
        ,"ComputedAccountBalance": {
            "class": "ComputedAccountBalance"
            , "schema": "FS4"
            , "table": "COMPUTED_ACCOUNT_BALANCES"
            , "defaultOrderBy": "pending_balance"
            , "properties": {
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "account": { "name": "account", "relationship": "none", "columnName": "account", "dataType": "string", "length": 0 },
                "user_entity_id": { "name": "user_entity_id", "relationship": "none", "columnName": "user_entity_id", "dataType": "number", "length": 0 },
                "entity_type": { "name": "entity_type", "relationship": "none", "columnName": "entity_type", "dataType": "number", "length": 0 },
                "balance": { "name": "balance", "relationship": "none", "columnName": "balance", "dataType": "number", "length": 0 },
                "pending_balance": { "name": "pending_balance", "relationship": "none", "columnName": "pending_balance", "dataType": "number", "length": 0 }
                }
            }
        ,"ComputedAccountIncome": {
            "class": "ComputedAccountIncome"
            , "schema": "FS4"
            , "table": "COMPUTED_ACCOUNT_INCOME"
            , "defaultOrderBy": "ID"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "account": { "name": "account", "relationship": "none", "columnName": "account", "dataType": "string", "length": 0 },
                "user_entity_id": { "name": "user_entity_id", "relationship": "none", "columnName": "user_entity_id", "dataType": "number", "length": 0 },
                "entity_type": { "name": "entity_type", "relationship": "none", "columnName": "entity_type", "dataType": "number", "length": 0 },
                "activity": { "name": "activity", "relationship": "none", "columnName": "activity", "dataType": "string", "length": 0 },
                "activity_desc": { "name": "activity_desc", "relationship": "none", "columnName": "activity_desc", "dataType": "string", "length": 0 },
                "order_id": { "name": "order_id", "relationship": "none", "columnName": "order_id", "dataType": "number", "length": 0 },
                "transaction_date": { "name": "transaction_date", "relationship": "none", "columnName": "transaction_date", "dataType": "Date", "length": 0 },
                "amount": { "name": "amount", "relationship": "none", "columnName": "amount", "dataType": "number", "length": 0 }
                }
            }
        ,"ComputedAccountPosition": {
            "class": "ComputedAccountPosition"
            , "schema": "FS4"
            , "table": "COMPUTED_ACCOUNT_POSITIONS"
            , "defaultOrderBy": "earliest_funds_received"
            , "properties": {
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "account": { "name": "account", "relationship": "none", "columnName": "account", "dataType": "string", "length": 0 },
                "user_entity_id": { "name": "user_entity_id", "relationship": "none", "columnName": "user_entity_id", "dataType": "number", "length": 0 },
                "entity_type": { "name": "entity_type", "relationship": "none", "columnName": "entity_type", "dataType": "number", "length": 0 },
                "book_value": { "name": "book_value", "relationship": "none", "columnName": "book_value", "dataType": "number", "length": 0 },
                "market_value": { "name": "market_value", "relationship": "none", "columnName": "market_value", "dataType": "number", "length": 0 },
                "shares": { "name": "shares", "relationship": "none", "columnName": "shares", "dataType": "number", "length": 0 },
                "pending_shares": { "name": "pending_shares", "relationship": "none", "columnName": "pending_shares", "dataType": "number", "length": 0 },
                "earliest_order_placed": { "name": "earliest_order_placed", "relationship": "none", "columnName": "earliest_order_placed", "dataType": "Date", "length": 0 },
                "earliest_funds_received": { "name": "earliest_funds_received", "relationship": "none", "columnName": "earliest_funds_received", "dataType": "Date", "length": 0 }
                }
            }
        ,"ComputedAccountTotalIncome": {
            "class": "ComputedAccountTotalIncome"
            , "schema": "FS4"
            , "table": "COMPUTED_ACCOUNT_TOTAL_INCOME"
            , "defaultOrderBy": "balance"
            , "properties": {
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "account": { "name": "account", "relationship": "none", "columnName": "account", "dataType": "string", "length": 0 },
                "user_entity_id": { "name": "user_entity_id", "relationship": "none", "columnName": "user_entity_id", "dataType": "number", "length": 0 },
                "entity_type": { "name": "entity_type", "relationship": "none", "columnName": "entity_type", "dataType": "number", "length": 0 },
                "balance": { "name": "balance", "relationship": "none", "columnName": "balance", "dataType": "number", "length": 0 }
                }
            }
        ,"ComputedProjectBalance": {
            "class": "ComputedProjectBalance"
            , "schema": "FS4"
            , "table": "COMPUTED_PROJECT_BALANCES"
            , "defaultOrderBy": "pending_balance"
            , "properties": {
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "balance": { "name": "balance", "relationship": "none", "columnName": "balance", "dataType": "number", "length": 0 },
                "pending_balance": { "name": "pending_balance", "relationship": "none", "columnName": "pending_balance", "dataType": "number", "length": 0 }
                }
            }
        ,"ComputedProjectIncome": {
            "class": "ComputedProjectIncome"
            , "schema": "FS4"
            , "table": "COMPUTED_PROJECT_INCOME"
            , "defaultOrderBy": "ID"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "activity": { "name": "activity", "relationship": "none", "columnName": "activity", "dataType": "string", "length": 0 },
                "activity_desc": { "name": "activity_desc", "relationship": "none", "columnName": "activity_desc", "dataType": "string", "length": 0 },
                "order_id": { "name": "order_id", "relationship": "none", "columnName": "order_id", "dataType": "number", "length": 0 },
                "transaction_date": { "name": "transaction_date", "relationship": "none", "columnName": "transaction_date", "dataType": "Date", "length": 0 },
                "amount": { "name": "amount", "relationship": "none", "columnName": "amount", "dataType": "number", "length": 0 }
                }
            }
        ,"ComputedProjectPosition": {
            "class": "ComputedProjectPosition"
            , "schema": "FS4"
            , "table": "COMPUTED_PROJECT_POSITIONS"
            , "defaultOrderBy": "pending_shares"
            , "properties": {
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "book_value": { "name": "book_value", "relationship": "none", "columnName": "book_value", "dataType": "number", "length": 0 },
                "market_value": { "name": "market_value", "relationship": "none", "columnName": "market_value", "dataType": "number", "length": 0 },
                "shares": { "name": "shares", "relationship": "none", "columnName": "shares", "dataType": "number", "length": 0 },
                "pending_shares": { "name": "pending_shares", "relationship": "none", "columnName": "pending_shares", "dataType": "number", "length": 0 }
                }
            }
        ,"ComputedProjectTotalIncome": {
            "class": "ComputedProjectTotalIncome"
            , "schema": "FS4"
            , "table": "COMPUTED_PROJECT_TOTAL_INCOME"
            , "defaultOrderBy": "balance"
            , "properties": {
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "balance": { "name": "balance", "relationship": "none", "columnName": "balance", "dataType": "number", "length": 0 }
                }
            }
        ,"InvestorCobranding": {
            "class": "InvestorCobranding"
            , "schema": "FS4"
            , "table": "INVESTOR_COBRANDINGS"
            , "defaultOrderBy": "cobrander_ids"
            , "properties": {
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "primary_cobrander_id": { "name": "primary_cobrander_id", "relationship": "none", "columnName": "primary_cobrander_id", "dataType": "number", "length": 0 },
                "primary_cobrander_name": { "name": "primary_cobrander_name", "relationship": "none", "columnName": "primary_cobrander_name", "dataType": "string", "length": 0 },
                "cobrander_ids": { "name": "cobrander_ids", "relationship": "none", "columnName": "cobrander_ids", "dataType": "string", "length": 0 }
                }
            }
        ,"InvestorSocialProfile": {
            "class": "InvestorSocialProfile"
            , "schema": "FS4"
            , "table": "INVESTOR_SOCIAL_PROFILE"
            , "defaultOrderBy": "ID"
            , "parentTable": "FS4.USERS_SOCIAL_PROFILE"
            , "parentClass": "UserSocialProfile"
            , "discriminator": "0"
            , "discriminator_column": "PROFILE_STATUS"
            , "properties": {
                "profile_type": { "name": "profile_type", "relationship": "none", "columnName": "profile_status", "dataType": "SocialProfileType", "length": 0 },
                "statute_id": { "name": "statute_id", "relationship": "none", "columnName": "statute_id", "dataType": "number", "length": 0 },
                "country_id": { "name": "country_id", "relationship": "none", "columnName": "country_id", "dataType": "number", "length": 0 },
                "province_id": { "name": "province_id", "relationship": "none", "columnName": "province_id", "dataType": "number", "length": 0 },
                "city": { "name": "city", "relationship": "none", "columnName": "city", "dataType": "string", "length": 0 },
                "address": { "name": "address", "relationship": "none", "columnName": "address", "dataType": "string", "length": 0 },
                "zip": { "name": "zip", "relationship": "none", "columnName": "zip", "dataType": "string", "length": 0 },
                "email": { "name": "email", "relationship": "none", "columnName": "email", "dataType": "string", "length": 0 },
                "phone": { "name": "phone", "relationship": "none", "columnName": "phone", "dataType": "string", "length": 0 },
                "biography": { "name": "biography", "relationship": "none", "columnName": "bio", "dataType": "string", "length": 0 },
                "career": { "name": "career", "relationship": "none", "columnName": "career", "dataType": "string", "length": 0 },
                "education": { "name": "education", "relationship": "none", "columnName": "education", "dataType": "string", "length": 0 },
                "preferences": { "name": "preferences", "relationship": "none", "columnName": "preferences", "dataType": "string", "length": 0 }
                }
            }
        ,"Investor": {
            "class": "Investor"
            , "schema": "FS4"
            , "table": "INVESTORS"
            , "defaultOrderBy": "ID"
            , "parentTable": "FS4.ALL_USERS"
            , "parentClass": "AllUser"
            , "discriminator": "i"
            , "discriminator_column": "USER_TYPE"
            , "properties": {
                "hubspot_vid": { "name": "hubspot_vid", "relationship": "none", "columnName": "hubspot_vid", "dataType": "string", "length": 0 },
                "email_verified_status": { "name": "email_verified_status", "relationship": "none", "columnName": "email_verified_status", "dataType": "boolean", "length": 0 },
                "linkedin": { "name": "linkedin", "relationship": "none", "columnName": "linkedin", "dataType": "string", "length": 0 },
                "facebook": { "name": "facebook", "relationship": "none", "columnName": "facebook", "dataType": "string", "length": 0 },
                "google_address": { "name": "google_address", "relationship": "none", "columnName": "google_address", "dataType": "string", "length": 0 },
                "apt_number": { "name": "apt_number", "relationship": "none", "columnName": "apt_number", "dataType": "string", "length": 0 },
                "actual_investment_level": { "name": "actual_investment_level", "relationship": "none", "columnName": "investor_type_system", "dataType": "InvestorAccreditation", "length": 0 },
                "user_proposed_investment_level": { "name": "user_proposed_investment_level", "relationship": "none", "columnName": "investor_type", "dataType": "InvestorAccreditation", "length": 0 },
                "exemption": { "name": "exemption", "relationship": "none", "columnName": "exemption", "dataType": "boolean", "length": 0 },
                "eligible_exemption": { "name": "eligible_exemption", "relationship": "none", "columnName": "eligible_exemption", "dataType": "boolean", "length": 0 },
                "statements_flag": { "name": "statements_flag", "relationship": "none", "columnName": "statements_flag", "dataType": "boolean", "length": 0 },
                "kyc_confirmed": { "name": "kyc_confirmed", "relationship": "none", "columnName": "kyc_confirmed", "dataType": "boolean", "length": 0 },
                "equifax_confirmed": { "name": "equifax_confirmed", "relationship": "none", "columnName": "equifax_confirmed", "dataType": "boolean", "length": 0 },
                "identity_confirmed": { "name": "identity_confirmed", "relationship": "none", "columnName": "identity_confirmed", "dataType": "boolean", "length": 0 },
                "citizen": { "name": "citizen", "relationship": "none", "columnName": "citizen", "dataType": "string", "length": 0 },
                "resident": { "name": "resident", "relationship": "none", "columnName": "resident", "dataType": "string", "length": 0 },
                "address": { "name": "address", "relationship": "none", "columnName": "address", "dataType": "string", "length": 0 },
                "zip": { "name": "zip", "relationship": "none", "columnName": "zip", "dataType": "string", "length": 0 },
                "city": { "name": "city", "relationship": "none", "columnName": "city", "dataType": "string", "length": 0 },
                "province_id": { "name": "province_id", "relationship": "none", "columnName": "province_id", "dataType": "number", "length": 0 },
                "mailing_address": { "name": "mailing_address", "relationship": "none", "columnName": "mailing_address", "dataType": "string", "length": 0 },
                "mailing_zip": { "name": "mailing_zip", "relationship": "none", "columnName": "mailing_zip", "dataType": "string", "length": 0 },
                "mailing_city": { "name": "mailing_city", "relationship": "none", "columnName": "mailing_city", "dataType": "string", "length": 0 },
                "mailing_apt_number": { "name": "mailing_apt_number", "relationship": "none", "columnName": "mailing_apt_number", "dataType": "string", "length": 0 },
                "sin": { "name": "sin", "relationship": "none", "columnName": "sin", "dataType": "string", "length": 0 },
                "phone": { "name": "phone", "relationship": "none", "columnName": "phone", "dataType": "string", "length": 0 },
                "workphone": { "name": "workphone", "relationship": "none", "columnName": "workphone", "dataType": "string", "length": 0 },
                "homephone": { "name": "homephone", "relationship": "none", "columnName": "homephone", "dataType": "string", "length": 0 },
                "fax": { "name": "fax", "relationship": "none", "columnName": "fax", "dataType": "string", "length": 0 },
                "workemail": { "name": "workemail", "relationship": "none", "columnName": "workemail", "dataType": "string", "length": 0 },
                "dob": { "name": "dob", "relationship": "none", "columnName": "dob", "dataType": "string", "length": 0 },
                "notes": { "name": "notes", "relationship": "none", "columnName": "notes", "dataType": "string", "length": 0 },
                "section_23": { "name": "section_23", "relationship": "none", "columnName": "section_23", "dataType": "string", "length": 0 },
                "section_29": { "name": "section_29", "relationship": "none", "columnName": "section_29", "dataType": "string", "length": 0 },
                "is_registrant": { "name": "is_registrant", "relationship": "none", "columnName": "is_registrant", "dataType": "string", "length": 0 },
                "is_insider": { "name": "is_insider", "relationship": "none", "columnName": "is_insider", "dataType": "string", "length": 0 },
                "legal_person": { "name": "legal_person", "relationship": "none", "columnName": "legal_person", "dataType": "string", "length": 0 },
                "client_number": { "name": "client_number", "relationship": "none", "columnName": "client_number", "dataType": "string", "length": 0 },
                "utm_source": { "name": "utm_source", "relationship": "none", "columnName": "utm_source", "dataType": "string", "length": 0 },
                "utm_medium": { "name": "utm_medium", "relationship": "none", "columnName": "utm_medium", "dataType": "string", "length": 0 },
                "utm_campaign": { "name": "utm_campaign", "relationship": "none", "columnName": "utm_campaign", "dataType": "string", "length": 0 },
                "utm_content": { "name": "utm_content", "relationship": "none", "columnName": "utm_content", "dataType": "string", "length": 0 },
                "utm_term": { "name": "utm_term", "relationship": "none", "columnName": "utm_term", "dataType": "string", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "UserState", "length": 0 },
                "suspend_request": { "name": "suspend_request", "relationship": "none", "columnName": "suspend_request", "dataType": "boolean", "length": 0 },
                "country_id": { "name": "country_id", "relationship": "none", "columnName": "country_id", "dataType": "number", "length": 0 },
                "mailing_country_id": { "name": "mailing_country_id", "relationship": "none", "columnName": "mailing_country_id", "dataType": "number", "length": 0 },
                "mailing_province_id": { "name": "mailing_province_id", "relationship": "none", "columnName": "mailing_province_id", "dataType": "number", "length": 0 },
                "cobranded_client_of_id": { "name": "cobranded_client_of_id", "relationship": "none", "columnName": "cobranded_client_of_id", "dataType": "number", "length": 0 },
                "balance": { "name": "balance", "relationship": "none", "columnName": "balance", "dataType": "number", "length": 0 },
                "referral_link": { "name": "referral_link", "relationship": "none", "columnName": "referral_link", "dataType": "string", "length": 0 },
                "last_edit": { "name": "last_edit", "relationship": "none", "columnName": "last_edit", "dataType": "Date", "length": 0 },
                "signup_date": { "name": "signup_date", "relationship": "none", "columnName": "signup_date", "dataType": "Date", "length": 0 },
                "referrer_site": { "name": "referrer_site", "relationship": "none", "columnName": "referrer_site", "dataType": "string", "length": 0 },
                "referrer_attribution": { "name": "referrer_attribution", "relationship": "none", "columnName": "referrer_attribution", "dataType": "string", "length": 0 }
                }
            }
        ,"IssuerAdmin": {
            "class": "IssuerAdmin"
            , "schema": "FS4"
            , "table": "ISSUER_ADMIN"
            , "defaultOrderBy": "ID"
            , "parentTable": "FS4.ALL_USERS"
            , "parentClass": "AllUser"
            , "discriminator": "c"
            , "discriminator_column": "USER_TYPE"
            , "properties": {
                "token": { "name": "token", "relationship": "none", "columnName": "token", "dataType": "string", "length": 0 },
                "token_update": { "name": "token_update", "relationship": "none", "columnName": "token_update", "dataType": "Date", "length": 0 },
                "cobranded_client_of_id": { "name": "cobranded_client_of_id", "relationship": "none", "columnName": "cobranded_client_of_id", "dataType": "number", "length": 0 },
                "status": { "name": "status", "relationship": "none", "columnName": "status", "dataType": "UserState", "length": 0 }
                }
            }
        ,"NotableInvestorProfile": {
            "class": "NotableInvestorProfile"
            , "schema": "FS4"
            , "table": "NOTABLE_INVESTOR_PROFILE"
            , "defaultOrderBy": "ID"
            , "parentTable": "FS4.USERS_SOCIAL_PROFILE"
            , "parentClass": "UserSocialProfile"
            , "discriminator": "1"
            , "discriminator_column": "PROFILE_STATUS"
            , "properties": {
                "profile_type": { "name": "profile_type", "relationship": "none", "columnName": "profile_status", "dataType": "SocialProfileType", "length": 0 },
                "statute_id": { "name": "statute_id", "relationship": "none", "columnName": "statute_id", "dataType": "number", "length": 0 },
                "country_id": { "name": "country_id", "relationship": "none", "columnName": "country_id", "dataType": "number", "length": 0 },
                "province_id": { "name": "province_id", "relationship": "none", "columnName": "province_id", "dataType": "number", "length": 0 },
                "city": { "name": "city", "relationship": "none", "columnName": "city", "dataType": "string", "length": 0 },
                "address": { "name": "address", "relationship": "none", "columnName": "address", "dataType": "string", "length": 0 },
                "zip": { "name": "zip", "relationship": "none", "columnName": "zip", "dataType": "string", "length": 0 },
                "email": { "name": "email", "relationship": "none", "columnName": "email", "dataType": "string", "length": 0 },
                "phone": { "name": "phone", "relationship": "none", "columnName": "phone", "dataType": "string", "length": 0 },
                "biography": { "name": "biography", "relationship": "none", "columnName": "bio", "dataType": "string", "length": 0 },
                "career": { "name": "career", "relationship": "none", "columnName": "career", "dataType": "string", "length": 0 },
                "education": { "name": "education", "relationship": "none", "columnName": "education", "dataType": "string", "length": 0 },
                "preferences": { "name": "preferences", "relationship": "none", "columnName": "preferences", "dataType": "string", "length": 0 },
                "investment_status": { "name": "investment_status", "relationship": "none", "columnName": "investment_status", "dataType": "number", "length": 0 }
                }
            }
        ,"PropertySocialProfile": {
            "class": "PropertySocialProfile"
            , "schema": "FS4"
            , "table": "PROPERTY_SOCIAL_PROFILE"
            , "defaultOrderBy": "ID"
            , "parentTable": "FS4.USERS_SOCIAL_PROFILE"
            , "parentClass": "UserSocialProfile"
            , "discriminator": "3"
            , "discriminator_column": "PROFILE_STATUS"
            , "properties": {
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "developer_number": { "name": "developer_number", "relationship": "none", "columnName": "developer_number", "dataType": "number", "length": 0 },
                "issuer_code": { "name": "issuer_code", "relationship": "none", "columnName": "issuer_code", "dataType": "string", "length": 0 },
                "profile_type": { "name": "profile_type", "relationship": "none", "columnName": "profile_status", "dataType": "SocialProfileType", "length": 0 },
                "legal_name": { "name": "legal_name", "relationship": "none", "columnName": "legal_name", "dataType": "string", "length": 0 },
                "categories": { "name": "categories", "relationship": "none", "columnName": "category", "dataType": "string", "length": 0 },
                "self_category": { "name": "self_category", "relationship": "none", "columnName": "self_category", "dataType": "string", "length": 0 },
                "bg_image": { "name": "bg_image", "relationship": "none", "columnName": "bg_image", "dataType": "string", "length": 0 },
                "signup_image": { "name": "signup_image", "relationship": "none", "columnName": "signup_image", "dataType": "string", "length": 0 },
                "signup_guide_image": { "name": "signup_guide_image", "relationship": "none", "columnName": "signup_guide_image", "dataType": "string", "length": 0 },
                "network_logo": { "name": "network_logo", "relationship": "none", "columnName": "network_logo", "dataType": "string", "length": 0 },
                "network_background": { "name": "network_background", "relationship": "none", "columnName": "network_bg", "dataType": "string", "length": 0 },
                "biography": { "name": "biography", "relationship": "none", "columnName": "bio", "dataType": "string", "length": 0 },
                "career": { "name": "career", "relationship": "none", "columnName": "career", "dataType": "string", "length": 0 },
                "education": { "name": "education", "relationship": "none", "columnName": "education", "dataType": "string", "length": 0 },
                "preferences": { "name": "preferences", "relationship": "none", "columnName": "preferences", "dataType": "string", "length": 0 },
                "person_ids": { "name": "person_ids", "relationship": "none", "columnName": "person_ids", "dataType": "string", "length": 0 },
                "investment_status": { "name": "investment_status", "relationship": "none", "columnName": "investment_status", "dataType": "number", "length": 0 },
                "background_image": { "name": "background_image", "relationship": "none", "columnName": "background_image", "dataType": "string", "length": 0 }
                }
            }
        ,"SponsorSocialProfile": {
            "class": "SponsorSocialProfile"
            , "schema": "FS4"
            , "table": "SPONSOR_SOCIAL_PROFILE"
            , "defaultOrderBy": "ID"
            , "parentTable": "FS4.USERS_SOCIAL_PROFILE"
            , "parentClass": "UserSocialProfile"
            , "discriminator": "2"
            , "discriminator_column": "PROFILE_STATUS"
            , "properties": {
                "project_id": { "name": "project_id", "relationship": "none", "columnName": "project_id", "dataType": "number", "length": 0 },
                "developer_number": { "name": "developer_number", "relationship": "none", "columnName": "developer_number", "dataType": "number", "length": 0 },
                "issuer_code": { "name": "issuer_code", "relationship": "none", "columnName": "issuer_code", "dataType": "string", "length": 0 },
                "profile_type": { "name": "profile_type", "relationship": "none", "columnName": "profile_status", "dataType": "SocialProfileType", "length": 0 },
                "legal_name": { "name": "legal_name", "relationship": "none", "columnName": "legal_name", "dataType": "string", "length": 0 },
                "jurisdiction_id": { "name": "jurisdiction_id", "relationship": "none", "columnName": "jurisdiction_id", "dataType": "number", "length": 0 },
                "statute_id": { "name": "statute_id", "relationship": "none", "columnName": "statute_id", "dataType": "number", "length": 0 },
                "country_id": { "name": "country_id", "relationship": "none", "columnName": "country_id", "dataType": "number", "length": 0 },
                "province_id": { "name": "province_id", "relationship": "none", "columnName": "province_id", "dataType": "number", "length": 0 },
                "city": { "name": "city", "relationship": "none", "columnName": "city", "dataType": "string", "length": 0 },
                "address": { "name": "address", "relationship": "none", "columnName": "address", "dataType": "string", "length": 0 },
                "zip": { "name": "zip", "relationship": "none", "columnName": "zip", "dataType": "string", "length": 0 },
                "email": { "name": "email", "relationship": "none", "columnName": "email", "dataType": "string", "length": 0 },
                "phone": { "name": "phone", "relationship": "none", "columnName": "phone", "dataType": "string", "length": 0 },
                "total_built": { "name": "total_built", "relationship": "none", "columnName": "total_built", "dataType": "string", "length": 0 },
                "value_built": { "name": "value_built", "relationship": "none", "columnName": "value_built", "dataType": "string", "length": 0 },
                "categories": { "name": "categories", "relationship": "none", "columnName": "category", "dataType": "string", "length": 0 },
                "self_category": { "name": "self_category", "relationship": "none", "columnName": "self_category", "dataType": "string", "length": 0 },
                "bg_image": { "name": "bg_image", "relationship": "none", "columnName": "bg_image", "dataType": "string", "length": 0 },
                "signup_image": { "name": "signup_image", "relationship": "none", "columnName": "signup_image", "dataType": "string", "length": 0 },
                "signup_guide_image": { "name": "signup_guide_image", "relationship": "none", "columnName": "signup_guide_image", "dataType": "string", "length": 0 },
                "network_logo": { "name": "network_logo", "relationship": "none", "columnName": "network_logo", "dataType": "string", "length": 0 },
                "network_background": { "name": "network_background", "relationship": "none", "columnName": "network_bg", "dataType": "string", "length": 0 },
                "rep_first_name": { "name": "rep_first_name", "relationship": "none", "columnName": "rep_first_name", "dataType": "string", "length": 0 },
                "rep_last_name": { "name": "rep_last_name", "relationship": "none", "columnName": "rep_last_name", "dataType": "string", "length": 0 },
                "rep_email": { "name": "rep_email", "relationship": "none", "columnName": "rep_email", "dataType": "string", "length": 0 },
                "rep_phone": { "name": "rep_phone", "relationship": "none", "columnName": "rep_phone", "dataType": "string", "length": 0 },
                "signup_greeting": { "name": "signup_greeting", "relationship": "none", "columnName": "signup_greeting", "dataType": "string", "length": 0 },
                "signup_paragraph": { "name": "signup_paragraph", "relationship": "none", "columnName": "signup_paragraph", "dataType": "string", "length": 0 },
                "signup_link": { "name": "signup_link", "relationship": "none", "columnName": "signup_link", "dataType": "string", "length": 0 },
                "signup_logo": { "name": "signup_logo", "relationship": "none", "columnName": "signup_logo", "dataType": "string", "length": 0 },
                "investment_step_cc_email": { "name": "investment_step_cc_email", "relationship": "none", "columnName": "investment_step_cc_email", "dataType": "string", "length": 0 },
                "investment_status": { "name": "investment_status", "relationship": "none", "columnName": "investment_status", "dataType": "number", "length": 0 },
                "show_referral_text": { "name": "show_referral_text", "relationship": "none", "columnName": "show_referral_text", "dataType": "boolean", "length": 0 },
                "show_referral_dialog": { "name": "show_referral_dialog", "relationship": "none", "columnName": "show_referral_dialog", "dataType": "boolean", "length": 0 },
                "signup_splash_logo": { "name": "signup_splash_logo", "relationship": "none", "columnName": "signup_splash_logo", "dataType": "string", "length": 0 },
                "background_image": { "name": "background_image", "relationship": "none", "columnName": "background_image", "dataType": "string", "length": 0 },
                "referral_bonus": { "name": "referral_bonus", "relationship": "none", "columnName": "referral_bonus", "dataType": "string", "length": 0 },
                "referral_disclaimer": { "name": "referral_disclaimer", "relationship": "none", "columnName": "referral_disclaimer", "dataType": "string", "length": 0 },
                "referral_expiry": { "name": "referral_expiry", "relationship": "none", "columnName": "referral_expiry", "dataType": "Date", "length": 0 },
                "referral_link": { "name": "referral_link", "relationship": "none", "columnName": "referral_link", "dataType": "string", "length": 0 }
                }
            }
        ,"UserBasic": {
            "class": "UserBasic"
            , "schema": "FS4"
            , "table": "USER_BASIC"
            , "defaultOrderBy": "ID"
            , "properties": {
                "id": { "name": "id", "relationship": "none", "columnName": "id", "dataType": "number", "length": 0 },
                "user_type": { "name": "user_type", "relationship": "none", "columnName": "user_type", "dataType": "UserType", "length": 0 },
                "first_name": { "name": "first_name", "relationship": "none", "columnName": "first_name", "dataType": "string", "length": 0 },
                "last_initial": { "name": "last_initial", "relationship": "none", "columnName": "last_initial", "dataType": "string", "length": 0 },
                "cobranded_client_of_id": { "name": "cobranded_client_of_id", "relationship": "none", "columnName": "cobranded_client_of_id", "dataType": "number", "length": 0 },
                "avatar_image_file_name": { "name": "avatar_image_file_name", "relationship": "none", "columnName": "image_file_name", "dataType": "string", "length": 0 },
                "signup_date": { "name": "signup_date", "relationship": "none", "columnName": "signup_date", "dataType": "Date", "length": 0 },
                "is_deleted": { "name": "is_deleted", "relationship": "none", "columnName": "is_deleted", "dataType": "boolean", "length": 0 },
                "last_changed_by_id": { "name": "last_changed_by_id", "relationship": "none", "columnName": "last_changed_by_id", "dataType": "number", "length": 0 },
                "updatetime": { "name": "updatetime", "relationship": "none", "columnName": "updatetime", "dataType": "Date", "length": 0 },
                "createtime": { "name": "createtime", "relationship": "none", "columnName": "createtime", "dataType": "Date", "length": 0 }
                }
            }
        ,"UserSignupEvent": {
            "class": "UserSignupEvent"
            , "schema": "FS4"
            , "table": "USER_SIGNUP_EVENTS"
            , "defaultOrderBy": "risk_toler"
            , "properties": {
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "basic_info": { "name": "basic_info", "relationship": "none", "columnName": "basic_info", "dataType": "Date", "length": 0 },
                "kyc_done": { "name": "kyc_done", "relationship": "none", "columnName": "kyc_done", "dataType": "Date", "length": 0 },
                "retrn_pref": { "name": "retrn_pref", "relationship": "none", "columnName": "retrn_pref", "dataType": "Date", "length": 0 },
                "time_hrzn": { "name": "time_hrzn", "relationship": "none", "columnName": "time_hrzn", "dataType": "Date", "length": 0 },
                "risk_toler": { "name": "risk_toler", "relationship": "none", "columnName": "risk_toler", "dataType": "Date", "length": 0 }
                }
            }
        ,"UserBeneficiary": {
            "class": "UserBeneficiary"
            , "schema": "FS4"
            , "table": "USERS_BENEFICIARY"
            , "defaultOrderBy": "ID"
            , "parentTable": "FS4.USERS_ENTITY"
            , "parentClass": "UserEntity"
            , "discriminator": "3"
            , "discriminator_column": "TYPE"
            , "properties": {
                "beneficiary_first_name": { "name": "beneficiary_first_name", "relationship": "none", "columnName": "beneficiary_first_name", "dataType": "string", "length": 0 },
                "beneficiary_last_name": { "name": "beneficiary_last_name", "relationship": "none", "columnName": "beneficiary_last_name", "dataType": "string", "length": 0 },
                "beneficiary_relationship": { "name": "beneficiary_relationship", "relationship": "none", "columnName": "beneficiary_relationship", "dataType": "string", "length": 0 },
                "beneficiary_share": { "name": "beneficiary_share", "relationship": "none", "columnName": "beneficiary_share", "dataType": "string", "length": 0 },
                "comments": { "name": "comments", "relationship": "none", "columnName": "comments", "dataType": "string", "length": 0 }
                }
            }
        ,"UserCorporation": {
            "class": "UserCorporation"
            , "schema": "FS4"
            , "table": "USERS_CORPORATION"
            , "defaultOrderBy": "ID"
            , "parentTable": "FS4.USERS_ENTITY"
            , "parentClass": "UserEntity"
            , "discriminator": "1"
            , "discriminator_column": "TYPE"
            , "properties": {
                "reg_no": { "name": "reg_no", "relationship": "none", "columnName": "reg_no", "dataType": "string", "length": 0 },
                "reg_domicile": { "name": "reg_domicile", "relationship": "none", "columnName": "reg_domicile", "dataType": "string", "length": 0 },
                "company_province_id": { "name": "company_province_id", "relationship": "none", "columnName": "company_province_id", "dataType": "number", "length": 0 },
                "business_nature": { "name": "business_nature", "relationship": "none", "columnName": "business_nature", "dataType": "string", "length": 0 },
                "registration_date": { "name": "registration_date", "relationship": "none", "columnName": "registration_date", "dataType": "string", "length": 0 },
                "email": { "name": "email", "relationship": "none", "columnName": "email", "dataType": "string", "length": 0 },
                "phone": { "name": "phone", "relationship": "none", "columnName": "phone", "dataType": "string", "length": 0 },
                "phone_ext": { "name": "phone_ext", "relationship": "none", "columnName": "phone_ext", "dataType": "string", "length": 0 },
                "director_first_name": { "name": "director_first_name", "relationship": "none", "columnName": "director_first_name", "dataType": "string", "length": 0 },
                "director_last_name": { "name": "director_last_name", "relationship": "none", "columnName": "director_last_name", "dataType": "string", "length": 0 },
                "director_address": { "name": "director_address", "relationship": "none", "columnName": "director_address", "dataType": "string", "length": 0 },
                "director_canadian": { "name": "director_canadian", "relationship": "none", "columnName": "director_canadian", "dataType": "string", "length": 0 },
                "shareholder_first_name": { "name": "shareholder_first_name", "relationship": "none", "columnName": "shareholder_first_name", "dataType": "string", "length": 0 },
                "shareholder_last_name": { "name": "shareholder_last_name", "relationship": "none", "columnName": "shareholder_last_name", "dataType": "string", "length": 0 },
                "shareholder_address": { "name": "shareholder_address", "relationship": "none", "columnName": "shareholder_address", "dataType": "string", "length": 0 },
                "shareholder_canadian": { "name": "shareholder_canadian", "relationship": "none", "columnName": "shareholder_canadian", "dataType": "string", "length": 0 },
                "signing_officer_first_name": { "name": "signing_officer_first_name", "relationship": "none", "columnName": "signing_officer_first_name", "dataType": "string", "length": 0 },
                "signing_officer_last_name": { "name": "signing_officer_last_name", "relationship": "none", "columnName": "signing_officer_last_name", "dataType": "string", "length": 0 },
                "signing_officer_title": { "name": "signing_officer_title", "relationship": "none", "columnName": "signing_officer_title", "dataType": "string", "length": 0 },
                "shareholder": { "name": "shareholder", "relationship": "none", "columnName": "shareholder", "dataType": "string", "length": 0 }
                }
            }
        ,"UserTrust": {
            "class": "UserTrust"
            , "schema": "FS4"
            , "table": "USERS_TRUST"
            , "defaultOrderBy": "ID"
            , "parentTable": "FS4.USERS_ENTITY"
            , "parentClass": "UserEntity"
            , "discriminator": "2"
            , "discriminator_column": "TYPE"
            , "properties": {
                "registration_date": { "name": "registration_date", "relationship": "none", "columnName": "registration_date", "dataType": "string", "length": 0 },
                "email": { "name": "email", "relationship": "none", "columnName": "email", "dataType": "string", "length": 0 },
                "phone": { "name": "phone", "relationship": "none", "columnName": "phone", "dataType": "string", "length": 0 },
                "phone_ext": { "name": "phone_ext", "relationship": "none", "columnName": "phone_ext", "dataType": "string", "length": 0 },
                "trustee_first_name": { "name": "trustee_first_name", "relationship": "none", "columnName": "trustee_first_name", "dataType": "string", "length": 0 },
                "trustee_last_name": { "name": "trustee_last_name", "relationship": "none", "columnName": "trustee_last_name", "dataType": "string", "length": 0 },
                "trustee_title": { "name": "trustee_title", "relationship": "none", "columnName": "trustee_title", "dataType": "string", "length": 0 }
                }
            }
        ,"ComputedAccount": {
            "class": "ComputedAccount"
            , "schema": "FS4"
            , "table": "COMPUTED_ACCOUNTS"
            , "defaultOrderBy": "user_entity_id"
            , "properties": {
                "user_id": { "name": "user_id", "relationship": "none", "columnName": "user_id", "dataType": "number", "length": 0 },
                "account": { "name": "account", "relationship": "none", "columnName": "account", "dataType": "string", "length": 0 },
                "user_entity_id": { "name": "user_entity_id", "relationship": "none", "columnName": "user_entity_id", "dataType": "number", "length": 0 }
                }
            }
    }`);
}
