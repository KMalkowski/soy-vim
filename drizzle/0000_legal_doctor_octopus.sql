CREATE TABLE `vim_tutor_exercise` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`code` text,
	`instructions` varchar(2000),
	CONSTRAINT `vim_tutor_exercise_id` PRIMARY KEY(`id`),
	CONSTRAINT `vim_tutor_exercise_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `vim_tutor_roadmap` (
	`id` int AUTO_INCREMENT NOT NULL,
	`description` varchar(2000),
	CONSTRAINT `vim_tutor_roadmap_id` PRIMARY KEY(`id`),
	CONSTRAINT `vim_tutor_roadmap_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `vim_tutor_roadmapProgress` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255),
	`roadmap_id` int,
	`completed_steps` int,
	CONSTRAINT `vim_tutor_roadmapProgress_id` PRIMARY KEY(`id`),
	CONSTRAINT `vim_tutor_roadmapProgress_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `vim_tutor_roadmapStep` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`roadmapId` int,
	`stepNumber` int,
	`exercise_id` bigint,
	CONSTRAINT `vim_tutor_roadmapStep_id` PRIMARY KEY(`id`),
	CONSTRAINT `vim_tutor_roadmapStep_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `vim_tutor_session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `vim_tutor_session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vim_tutor_user` (
	`id` varchar(255) NOT NULL,
	`age` int,
	`username` varchar(32) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	CONSTRAINT `vim_tutor_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `vim_tutor_user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `vim_tutor_roadmapProgress` ADD CONSTRAINT `vim_tutor_roadmapProgress_user_id_vim_tutor_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `vim_tutor_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vim_tutor_roadmapProgress` ADD CONSTRAINT `vim_tutor_roadmapProgress_roadmap_id_vim_tutor_roadmap_id_fk` FOREIGN KEY (`roadmap_id`) REFERENCES `vim_tutor_roadmap`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vim_tutor_roadmapStep` ADD CONSTRAINT `vim_tutor_roadmapStep_roadmapId_vim_tutor_roadmap_id_fk` FOREIGN KEY (`roadmapId`) REFERENCES `vim_tutor_roadmap`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vim_tutor_roadmapStep` ADD CONSTRAINT `vim_tutor_roadmapStep_exercise_id_vim_tutor_exercise_id_fk` FOREIGN KEY (`exercise_id`) REFERENCES `vim_tutor_exercise`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vim_tutor_session` ADD CONSTRAINT `vim_tutor_session_user_id_vim_tutor_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `vim_tutor_user`(`id`) ON DELETE no action ON UPDATE no action;