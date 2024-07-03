import Controller from "./Controller";
import { NextFunction, Request, Response } from "express";
import { buildHierarchy } from "../Action/BuildHierarchy";
import { authenticate } from "../Action/Authenticate";
import { EmployeeHierarchyQueryParams } from "../Request/EmployeeHierarchyQueryParams";
import { AuthBodyParams } from "../Request/AuthBodyParams";
import { EmployeeIDValidator } from "../Validator/EmployeeIDValidator";
import { UserValidator } from "../Validator/UserValidator";
import { JWTValidator } from "../Middleware/JWTValidatorMiddleware";
import { AuthResponse } from "../Type/AuthResponse";
import { getErrorMessage, log } from "../Util/Helper";
import { fetchDataFromAnotherApi } from "../Service/EmployeeHierarchyService";

export default class ApiController extends Controller {
  async employeeHierarchy(
    req: Request<unknown, unknown, unknown, EmployeeHierarchyQueryParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.query;
      const hierarchicalEmployees = await buildHierarchy(id);
      res.json(hierarchicalEmployees);
    } catch (error) {
      log(error);
      next(error);
    }
  }

  auth(
    req: Request<unknown, unknown, AuthBodyParams, unknown>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username, password } = req.body;
      const reqBody: AuthBodyParams = {
        username,
        password,
      };

      const authResponse: AuthResponse = authenticate(reqBody);

      if (!authResponse.success) {
        return res.status(authResponse.errorCode!).json({
          message: getErrorMessage(authResponse.errorCode!),
        });
      }

      res.json({ token: authResponse.token });
    } catch (error) {
      log(error);
      next(error);
    }
  }
  async employeeHierarchyWithAuth(
    req: Request<unknown, unknown, unknown, EmployeeHierarchyQueryParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.query;
      const hierarchicalEmployees = await fetchDataFromAnotherApi(id);
      res.json(hierarchicalEmployees);
    } catch (error) {
      log(error);
      next(error);
    }
  }

  register() {
    this.router.get(
      "/employee",
      [EmployeeIDValidator],
      this.employeeHierarchy.bind(this)
    );
    this.router.post("/auth", [UserValidator], this.auth.bind(this));
    this.router.get(
      "/auth-employee",
      [EmployeeIDValidator],
      [JWTValidator],
      this.employeeHierarchyWithAuth.bind(this)
    );
    return this.router;
  }
}
