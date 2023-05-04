using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

namespace DataAccessLayer
{
    public class SQLDataAccess:IDataAccess
    {
        private readonly AstroDBContext context;
        public SQLDataAccess(AstroDBContext context)
        {
            this.context = context;
        }

        public async Task<T> GetByIdAsync<T>(string id)where T : class
        {
            return await context.Set<T>().FindAsync(id);

        }
        public async Task<IEnumerable<T>> GetAllAsync<T>() where T : class
        {
            return await context.Set<T>().ToListAsync();

        }

        public async Task<IEnumerable<T>> GetWhereAsync<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            return await context.Set<T>().Where(predicate).ToListAsync();
        }

        public async Task<int> CountAsync<T>() where T : class
        {
            return await context.Set<T>().CountAsync();
        }

        public async Task<T> CreateAsync<T>(T entity) where T : class
        {
            await context.Set<T>().AddAsync(entity);
            await context.SaveChangesAsync();
            return entity;
        }
        public async Task UpdateAsync<T>(T entity) where T : class
        {
            context.Set<T>().Update(entity);
            await context.SaveChangesAsync();
        }
        public async Task DeleteAsync<T>(T entity) where T : class
        {
            context.Set<T>().Remove(entity);
            await context.SaveChangesAsync();
        }
        public async Task BeginTransactionAsync()
        {
            await context.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            await context.Database.CommitTransactionAsync();
        }

        public async Task RollbackTransactionAsync()
        {
            await context.Database.RollbackTransactionAsync();
        }

       

    }
}
