import { Request, Response } from "express";
import usageModel from "./usage.model";
import { Op } from "sequelize";
import userModel from "../user/user.model";
import subscribeModel from "../subscriptions/subscribe.model";
import planModel from "../plans/plans.model";

export const createUsage = async (req: Request, res: Response) => {
  const { usedUnits, userId } = req.body;
  if (!usedUnits || !userId) {
    return res
      .status(400)
      .json({ error: "Used Units and User ID are required" });
  }

  const usage = await usageModel.create({ usedUnits, userId });
  return res.status(201).json({
    message: "Usage recorded successfully",
    success: true,
  });
};

export const findLastMonthUsage = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const user = await userModel.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } 
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const usage = await usageModel.findAll({
    where: {
      userId,
      createdAt: {
        [Op.between]: [startDate, last],
      },
    },
    limit: 30,
  });
  return res.status(200).json(usage);
};

export const billingSummary = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const user = await userModel.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const [totalUsage, planQuota] = await Promise.all([
    usageModel.sum("usedUnits", { where: { userId } }),
    subscribeModel.findOne({ where: { userId, isActive: true } }),
  ]);

  const plan = await planModel.findOne({ where: { id: planQuota?.planId } });
  const extraUnits = totalUsage - plan?.monthlyQuota || 0;
  const extraCharges =
    extraUnits > 0 ? extraUnits * (plan?.extraChargePerUnit || 0) : 0;

  res.status(200).json({
    user: user?.name,
    totalUsage,
    planQuota: plan?.monthlyQuota || 0,
    extraUnits: extraUnits > 0 ? extraUnits : 0,
    extraCharges,
    planInfo: plan,
  });
};
