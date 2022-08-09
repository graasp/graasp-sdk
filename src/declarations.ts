import { ObjectSchema } from 'fluent-json-schema';

import { Session } from '@fastify/secure-session';

import { Actor, TaskRunner } from './interfaces';
import {
  ActionTaskManager,
  AuthTokenSubject,
  Database,
  H5PTaskManager,
  ItemMembershipService,
  ItemMembershipTaskManager,
  ItemService,
  ItemTaskManager,
  LocalFileConfiguration,
  Member,
  MemberService,
  MemberTaskManager,
  PublicItemService,
  PublicItemTaskManager,
  S3FileConfiguration,
} from './services';
import { ActionService } from './services/action/interfaces/db-service';

declare module 'fastify' {
  interface FastifyRequest {
    /** member id extracted from auth token when auth is token based (app) */
    memberId: string;

    /**
     * Member and session are available if the user has been authenticated and verified
     */
    member: Member;
    session: Session;

    /**
     * App token subject
     */
    authTokenSubject?: AuthTokenSubject;
  }

  interface FastifyInstance {
    // database
    db: Database;

    // task runner
    taskRunner: TaskRunner<Actor>;

    // mailer
    mailer: {
      sendRegisterEmail: (
        member: Member,
        link: string,
        lang?: string,
      ) => Promise<void>;
      sendLoginEmail: (
        member: Member,
        link: string,
        reRegistrationAttempt?: boolean,
        lang?: string,
      ) => Promise<void>;
      sendExportActionsEmail: (
        member: Member,
        link: string,
        itemName: string,
        lang?: string,
        expirationDays?: number,
      ) => Promise<void>;
      sendInvitationEmail: (
        email: string,
        link: string,
        itemName: string,
        creatorName: string,
        lang?: string,
      ) => Promise<void>;
      sendPublishNotificationEmail: (
        member: Member,
        link: string,
        itemName: string,
        lang?: string,
      ) => Promise<void>;
    };

    // item service
    items: {
      taskManager: ItemTaskManager;
      dbService: ItemService;
      extendCreateSchema: (itemTypeSchema?: ObjectSchema) => void;
      extendExtrasUpdateSchema: (itemTypeSchema?: ObjectSchema) => void;
    };

    // item membership service
    itemMemberships: {
      taskManager: ItemMembershipTaskManager;
      dbService: ItemMembershipService;
    };

    // member service
    members: {
      taskManager: MemberTaskManager;
      dbService: MemberService;
    };

    // auth service
    corsPluginOptions: {
      origin: (string | RegExp)[];
      credentials: boolean;
      maxAge: number;
    };

    /**
     * Verify authentication based on session cookie or auth token,
     * extract member from it, and set `request.member`.
     * Throws exception if it fails.
     */
    verifyAuthentication: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;

    /**
     * Validate session, extract member from it, and set `request.member`.
     * Throws exception if it fails.
     */
    validateSession: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;

    /**
     * Tries to verify authentication based on session cookie or auth token,
     * extract member from it, and set `request.member`.
     * Does not fail/throw - simply does not set `request.member`.
     */
    attemptVerifyAuthentication: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;

    /**
     * Generate auth+refresh tokens pair for token base auth
     */
    generateAuthTokensPair: (
      memberId: string,
    ) => Promise<{ authToken: string; refreshToken: string }>;

    /** public service
     * graaspActor is a generic user who performs public tasks
     * publicTagId tag id
     */
    public?: {
      graaspActor: Actor;
      publicTagId: string;
      publishedTagId: string;
      items: {
        taskManager: PublicItemTaskManager;
        dbService: PublicItemService;
      };
    };

    /** File configurations
     * to be replaced with services
     */
    file?: {
      s3Config?: S3FileConfiguration;
      localConfig?: LocalFileConfiguration;
    };

    /**
     * H5P service
     */
    h5p?: {
      taskManager: H5PTaskManager;
    };

    /**
     * Action service
     */
    actions?: {
      taskManager: ActionTaskManager;
      dbService: ActionService;
    };
  }
}
