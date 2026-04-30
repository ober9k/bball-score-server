import { toOption } from "@/lib/converters";
import type { Option } from "@/types/option";

export abstract class BaseService<T, TBrief, TBriefData> {

  public abstract async findAll(brief?: boolean): Promise<T[] | TBrief[]>;

  public abstract async findById(id: number, brief?: boolean): Promise<T | TBrief>;

  public abstract async save(data: TBriefData): Promise<TBrief>;

  public abstract async saveById(id: number, data: TBriefData): Promise<TBrief>;

  public abstract async findOptions(): Promise<Option[]>;

  protected abstract toItem(data: any): T;

  protected mapItems(items: any[]): T[] {
    return items
      .map((item) => this.toItem(item));
  }

  protected abstract toBriefItem(data: any): TBrief;

  protected mapBriefItems(items: any[]): TBrief[] {
    return items
      .map((item) => this.toBriefItem(item));
  }

  protected toOption(item: any): Option {
    return toOption(item);
  }

  protected mapOptions(items: any[]): Option[] {
    return items
      .map((item) => this.toOption(item));
  }

}
