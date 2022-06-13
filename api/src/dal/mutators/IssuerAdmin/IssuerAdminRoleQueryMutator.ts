import { QueryMutator } from "../../QueryMutator";
import { FirstMatchQueryMutator } from "../FirstMatchQueryMutator";
import { NoAccessQueryMutator } from "../NoAccessQueryMutator";
import { TableSpecificQueryMutator } from "../TableSpecificQueryMutator";
import { UserTypeQueryMutator } from "../UserTypeQueryMutator";
import { InvestmentOrderQueryMutator } from "./InvestmentOrderQueryMutator";
import { InvestorQueryMutator } from "./InvestorQueryMutator";
import { IssuerAdminQueryMutator } from "./IssuerAdminQueryMutator";
import { ProjectIdQueryMutator } from "./ProjectIdQueryMutator";
import { ProjectQueryMutator } from "./ProjectQueryMutator";
import { UserIdQueryMutator } from "./UserIdQueryMutator";
import { UserIssuerAssociationQueryMutator } from "./UserIssuerAssociationQueryMutator";
import { UserPdfMutator } from "./UserPdfQueryMutator";
import { NoChangeQueryMutator } from "../NoChangeQueryMutator";
import { OrderIdQueryMutator } from "./OrderIdQueryMutator";
import { EmailQueryMutator } from "./EMailQueryMutator";
import { ProjectEntityDetailsQueryMutator } from "./ProjectEntityDetailsQueryMutator";
import { PropertyInterestQueryMutator } from "./PropertyInterestQueryMutator";
import { UserType } from 'fundscraper-model-enums';

/**
 * an aggregate query mutator to implement filtering for the issuer admin rile
 */
export const issuerAdminQueryMutator: QueryMutator = new UserTypeQueryMutator(UserType.issuer_admin
    , new FirstMatchQueryMutator([
        new TableSpecificQueryMutator('admin_user', new NoAccessQueryMutator())

        , new TableSpecificQueryMutator('countries', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('provinces', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('investor_acknowledgements', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('users_social_post', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('users_social_linkup', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('registration_questionary', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('profile_background', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('support_engineers', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('project_roed', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('notable_investor_profile', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('users_social_profile', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('investor_social_profile', new NoChangeQueryMutator())
        , new TableSpecificQueryMutator('sponsor_social_profile', new NoChangeQueryMutator())

        , new TableSpecificQueryMutator('investors', new InvestorQueryMutator())
        , new TableSpecificQueryMutator('user_basic', new InvestorQueryMutator())
        , new TableSpecificQueryMutator('all_users', new InvestorQueryMutator())
        , new TableSpecificQueryMutator('issuer_admin', new IssuerAdminQueryMutator())

        , new TableSpecificQueryMutator('investment_orders', new InvestmentOrderQueryMutator())
        , new TableSpecificQueryMutator('investor_ack_orders', new OrderIdQueryMutator())

        , new TableSpecificQueryMutator('user_issuer_associations', new UserIssuerAssociationQueryMutator())
        , new TableSpecificQueryMutator('users_pdf', new UserPdfMutator())
        , new TableSpecificQueryMutator('mails', new EmailQueryMutator())

        // tables dependent upon seeing the user
        , new TableSpecificQueryMutator('all_users_answers', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('ffba_association', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('imported_contacts', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('users_questionary', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('users_beneficiary', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('users_corporation', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('users_entity', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('user_relationship', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('users_banking_details', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('users_invitee', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('users_employment', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('users_invitee', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('users_request', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('users_subscribe', new UserIdQueryMutator())
        , new TableSpecificQueryMutator('users_trust', new UserIdQueryMutator())

        // tables dependent upon seeing the project
        , new TableSpecificQueryMutator('projects', new ProjectQueryMutator())
        , new TableSpecificQueryMutator('events', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('investment_transaction', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('investor_earnings', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('investor_intended_trades', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('investment_watchlist', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('payment_methods', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('project_earnings', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('project_docusign_mappings', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('project_entity', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('project_images', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('project_keybackers', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('project_pdfs', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('project_status_reports', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('project_tax_reports', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('project_tax_summaries', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('property_social_profile', new ProjectIdQueryMutator())
        , new TableSpecificQueryMutator('roed_schedule1s', new ProjectIdQueryMutator())

        , new TableSpecificQueryMutator('property_interest', new PropertyInterestQueryMutator())
        , new TableSpecificQueryMutator('project_entity_details', new ProjectEntityDetailsQueryMutator())
    ]
        , new NoAccessQueryMutator()));
