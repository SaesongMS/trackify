using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DTOs;
using System.Security.Claims;


namespace Controllers;
[ApiController]
[Route("api/reports")]
public class ReportController : ControllerBase
{
    private readonly AuthenticationService _authenticationService;
    private readonly ScrobbleService _scrobbleService;
    private readonly ReportService _reportService;

    public ReportController(AuthenticationService authenticationService, ScrobbleService scrobbleService, ReportService reportService)
    {
        _authenticationService = authenticationService;
        _scrobbleService = scrobbleService;
        _reportService = reportService;
    }

    [HttpPost("subjectsCount")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<ActionResult> GetSubjectsCount(ReportRequest subjectCountRequest)
    {
        var result = await _reportService.GetSubjectsCount(subjectCountRequest.StartDate, subjectCountRequest.EndDate, subjectCountRequest.UserId);
        return Ok(result);
    }

    [HttpPost("info")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<ActionResult> GetInfo(ReportRequest infoRequest)
    {
        var result = await _reportService.GetInfo(infoRequest.StartDate, infoRequest.EndDate, infoRequest.UserId);
        return Ok(result);
    }

    [HttpPost("topUsers")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<ActionResult> GetTopUsers(ReportRequest topUsersRequest)
    {
        //u can change limit of users, currently it is 5
        var result = await _reportService.GetTopUsers(topUsersRequest.StartDate, topUsersRequest.EndDate, topUsersRequest.UserId , 5);
        return Ok(result);
    }

    [HttpPost("countByDay")]
    public async Task<ActionResult> GetCountByDay(ReportRequest countByDayRequest)
    {
        var result = await _reportService.GetCountByDay(countByDayRequest.StartDate, countByDayRequest.EndDate, countByDayRequest.UserId);
        return Ok(result);
    }

    [HttpPost("countByWeek")]
    public async Task<ActionResult> GetCountByWeek(ReportRequest countByWeekRequest)
    {
        var result = await _reportService.GetCountByWeek(countByWeekRequest.StartDate, countByWeekRequest.EndDate, countByWeekRequest.UserId);
        return Ok(result);
    }

    [HttpPost("countByMonth")]
    public async Task<ActionResult> GetCountByMonth(ReportRequest countByMonthRequest)
    {
        var result = await _reportService.GetCountByMonth(countByMonthRequest.StartDate, countByMonthRequest.EndDate, countByMonthRequest.UserId);
        return Ok(result);
    }
}